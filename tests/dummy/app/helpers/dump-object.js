import Ember from 'ember';

export default Ember.Helper.helper(([object]) => {
  if (!object) {
    return '';
  }
  let keys = Object.keys(object);
  let strings = [];
  keys.forEach(key => {
    strings.push(key);
    strings.push(object[key]);
  });
  return strings.join('-');
});
