import Ember from 'ember';

export default Ember.Helper.helper(([array]) => {
  if (!array) {
    return '';
  }
  return array.join('-');
});
