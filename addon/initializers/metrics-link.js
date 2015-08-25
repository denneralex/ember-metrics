import Ember from 'ember';
import LinkComponent from 'ember-metrics/ext/link';

export function initialize() {
  if(Ember.LinkComponent){
    Ember.LinkComponent = LinkComponent;
  } else {
    Ember.LinkView = LinkComponent;
  }
}

export default {
  name: 'metrics-link',
  initialize
};
