import Ember from 'ember';

const {run} = Ember;

class EmberComponentWrapper extends HTMLElement {
  attachedCallback() {
    let webComponentsService = this.appInstance.lookup('service:web-components');
    let id = Ember.guidFor(this);
    this.id = id;
    this.componentRef = webComponentsService.scheduleAppend(this);
  }
  detachedCallback() {
    let webComponentsService = this.appInstance.lookup('service:web-components');
    webComponentsService.remove(this.componentRef);
  }
}
EmberComponentWrapper.isEmberComponentWrapper = true;

function registerWebComponent(name, appInstance) {
  EmberComponentWrapper.prototype.appInstance = appInstance;
  let customElementTest = document.createElement(name);
  if (!customElementTest.constructor.isEmberComponentWrapper) {
    document.registerElement(name, EmberComponentWrapper);
  }
}

export function initialize(appInstance) {
  let componentModuleNames = Object.keys(appInstance.__registry__.knownForType('component'));
  componentModuleNames.forEach(componentModuleName => {
    let componentFactory = appInstance._lookupFactory(componentModuleName);
    let componentName = componentModuleName.split(':')[1];
    if (componentFactory.isWebComponent) {
      registerWebComponent(componentName, appInstance);
    }
  });
}

export default {
  name: 'register-web-components',
  initialize
};
