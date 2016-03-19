import Component from 'ember-web-component-publisher/component';

const DummyComponent = Component.extend();

DummyComponent.wcAttrs({
  selected: Boolean,
  name: String,
  age: Number,
  data: Object,
  ['a-list']: Array
});

export default DummyComponent;
