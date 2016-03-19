import { moduleForComponent, test } from 'ember-qunit';
import { initialize } from 'ember-web-component-publisher/instance-initializers/register-web-components';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const {getOwner} = Ember;

moduleForComponent('dummy-component', 'Integration | Component | dummy component', {
  integration: true,
  beforeEach() {
    initialize(getOwner(this));
    this.render(hbs`{{web-components}}`);
  }
});

test('it renders', function(assert) {
  let done = assert.async();
  let sandbox = $('#ember-testing');
  sandbox.html('<dummy-component></dummy-component>');
  setTimeout(function() {
    assert.equal(sandbox.text().trim(), 'PoC');
    done();
  }, 0);
});

test('it renders with boolean arg', function(assert) {
  let done = assert.async();
  let sandbox = $('#ember-testing');
  sandbox.html('<dummy-component selected="selected"></dummy-component>');
  setTimeout(function() {
    assert.equal(sandbox.text().trim(), 'PoC selected');
    done();
  }, 0);
});

test('it renders with string arg', function(assert) {
  let done = assert.async();
  let sandbox = $('#ember-testing');
  sandbox.html('<dummy-component name="bob"></dummy-component>');
  setTimeout(function() {
    assert.equal(sandbox.text().trim(), 'PoC bob');
    done();
  }, 0);
});

test('it renders with number arg', function(assert) {
  let done = assert.async();
  let sandbox = $('#ember-testing');
  sandbox.html('<dummy-component age=5></dummy-component>');
  setTimeout(function() {
    assert.equal(sandbox.text().trim(), 'PoC 2+age=7');
    done();
  }, 0);
});

test('it renders with array arg', function(assert) {
  let done = assert.async();
  let sandbox = $('#ember-testing');
  sandbox.html('<dummy-component a-list="[&quot;cat&quot;,4]"></dummy-component>');
  setTimeout(function() {
    assert.equal(sandbox.text().trim(), 'PoC cat-4');
    done();
  }, 0);
});

test('it renders with object arg', function(assert) {
  let done = assert.async();
  let sandbox = $('#ember-testing');
  sandbox.html('<dummy-component data="{&quot;label&quot;:&quot;joe&quot;}"></dummy-component>');
  setTimeout(function() {
    assert.equal(sandbox.text().trim(), 'PoC label-joe');
    done();
  }, 0);
});
