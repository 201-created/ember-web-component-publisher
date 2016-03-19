import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const WebComponentsService = Ember.Service.extend();

const dummyComponentTemplate = hbs`dummy template`;

moduleForComponent('web-components', 'Integration | Component | web components', {
  integration: true,
  beforeEach() {
    this.register('template:components/test-dummy-component', dummyComponentTemplate);
    this.register('service:web-components', WebComponentsService);
    this.inject.service('web-components');
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{web-components}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it renders web component', function(assert) {
  $('#ember-testing').html('<div id="123"></div>');
  this.get('web-components').set('components', [
    {element: '123', name: 'test-dummy-component'}
  ]);
  this.render(hbs`{{web-components}}`);
  assert.equal($('#ember-testing').text().trim(), 'dummy template');
});
