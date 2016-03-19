import Ember from 'ember';

export default Ember.Helper.helper(params => {
  let total = 0;
  params.forEach(param => {
    total += param;
  });
  return total;
});
