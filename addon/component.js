import Ember from 'ember';

export default Ember.Component.extend().reopenClass({
  isWebComponent: true,
  wcAttrs(attrMap) {
    this.reopenClass({attrMap});
  }
});
