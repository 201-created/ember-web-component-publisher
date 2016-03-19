import Ember from 'ember';
import layout from '../templates/components/web-components';

const {inject} = Ember;

export default Ember.Component.extend({
  layout,
  webComponents: inject.service()
});
