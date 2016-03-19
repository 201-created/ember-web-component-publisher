import { moduleFor, test } from 'ember-qunit';
import Component from 'ember-web-component-publisher/component';

const FunTimesComponent = Component.extend();
const BadTimesComponent = Component.extend();

moduleFor('service:web-components', 'Unit | Service | web components', {
  beforeEach() {
    this.register('component:fun-times', FunTimesComponent);
    this.register('component:bad-times', BadTimesComponent);
  }
});

test('it can add and remove a component', function(assert) {
  let done = assert.async();
  let service = this.subject();
  let firstElement = document.createElement('fun-times');
  let secondElement = document.createElement('bad-times');
  assert.equal(service.get('components.length'), 0);
  let first = service.scheduleAppend(firstElement);
  assert.equal(service.get('components.length'), 0);
  let second = service.scheduleAppend(secondElement);
  assert.equal(service.get('components.length'), 0);
  // Wait on microtask queue for additions
  setTimeout(() => {
    assert.equal(service.get('components.length'), 2);
    // Removals happen right away
    service.remove(first);
    assert.equal(service.get('components.length'), 1);
    service.remove(second);
    assert.equal(service.get('components.length'), 0);
    done();
  }, 0);
});
