import Ember from 'ember';
const {computed, run, getOwner} = Ember;

function processAttribute(type, value) {
  if (type === Boolean) {
    if (value === 'false') {
      return false;
    } else {
      return !!value;
    }
  }
  if (value === undefined || value === null) {
    return value;
  }
  switch (type) {
    case Number:
      return parseInt(value, 10);
      break;
    case String:
      return ''+value;
      break;
    case Array:
    case Object:
      return JSON.parse(value);
      break;
    default:
      throw new Error(`Attempted to process a value of "${value}" with the unknown type "${type}"`);
  }
}

function processAttributes(element, attrMap) {
  let attrKeys = Object.keys(attrMap);
  let processed = {};
  attrKeys.forEach(key => {
    let value = element.getAttribute(key);
    if (value === undefined || value === null) {
      processed[key] = value;
    } else {
      processed[key] = processAttribute(attrMap[key], value);
    }
  });
  return processed;
}

export default Ember.Service.extend({
  init() {
    this._pendingRefs = [];
  },
  components: computed(function() {
    return Ember.A([]);
  }),
  scheduleAppend(element) {
    let name = element.tagName;
    let {attrMap} = getOwner(this)._lookupFactory(`component:${name}`);
    let attrs = {};
    if (attrMap) {
      attrs = processAttributes(element, attrMap);
    }
    let componentRef = {element: element.id, name, attrs};
    this._pendingRefs.push(componentRef);
    this.scheduleFlush();
    return componentRef;
  },
  raiseHandle() {
  },
  flushPending() {
    let components = this.get('components');
    this._pendingRefs.forEach(ref => {
      components.pushObject(ref);
    });
    this._pendingRefs.length = 0;
    this.raiseHandle();
  },
  scheduleFlush() {
    if (this._pendingRefs.length === 1) { /* First ref, so schedule */
      Promise.resolve().then(() => {
        run(this, this.flushPending);
      });
    }
  },
  remove(componentRef) {
    this.get('components').removeObject(componentRef);
  }
});
