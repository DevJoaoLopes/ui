import { oneWay } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { observer, set } from '@ember/object';
import { isEmbedded } from 'shared/utils/util';

export default Controller.extend({
  settings: service(),

  resourceActions:   service('resource-actions'),
  tooltipService:    service('tooltip'),
  router:            service(),

  // GitHub auth params
  queryParams: ['isPopup', 'fromAuthProvider'],

  error:             null,
  error_description: null,
  state:             null,
  code:              null,
  isPopup:           null,
  isEmbedded:        false,

  tooltip:           oneWay('tooltipService.tooltipOpts.type'),
  tooltipTemplate:   oneWay('tooltipService.tooltipOpts.template'),

  init() {
    this._super(...arguments);

    if ( this.get('app.environment') === 'development' ) {
      run.backburner.DEBUG = true;
    }

    set(this, 'isEmbedded', isEmbedded());
  },

  // currentRouteName is set by Ember.Router
  // but getting the application controller to get it is inconvenient sometimes
  currentRouteNameChanged: observer('router.currentRouteName', function() {
    this.set('app.currentRouteName', this.get('router.currentRouteName'));
  }),
});
