/**
 * @appular app
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var $body = $('body');

    Backbone.Model = (function(Model) {
        return Model.extend({
            config: {},
            fetch: function (options) {
                if (this.fixture && this.config.useFixtures) {
                    options.url = this.fixture;
                }

                return Model.prototype.fetch.apply(this, arguments);
            }
        });
    })(Backbone.Model);

    Backbone.Collection = (function(Collection) {
        return Collection.extend({
            config: {},
            fetch: function (options) {
                if (this.fixture && this.config.useFixtures) {
                    options.url = this.fixture;
                }

                return Collection.prototype.fetch.apply(this, arguments);
            }
        });
    })(Backbone.Collection);

    Backbone.View = (function(View) {
        var viewOptions = [
                'model',
                'collection',
                'el',
                'id',
                'attributes',
                'className',
                'tagName',
                'events',
                'app'
            ];

        return View.extend({
            config: {},
            listeners: {},
            constructor: function(options) {
                this.views = {};
                this.plugins = {};
                this.options = this.options || {};

                options = options || {};

                // go ahead and set the model if sent in options
                if (options.model) {
                    this.model = options.model;
                }

                if (options.app) {
                    this.app = options.app;
                }

                // add data object to view and model
                _.extend(this.options, _.omit(options, viewOptions));

                // set up on's or listenTo's from the listeners object
                _.each(this.listeners, function (value, key) {
                    var events = key.split(' '),
                        property,
                        callback = _.isFunction(value) ? value : this[value];

                    // find out if we are listening to app, model, or collection so that we can use listenTo
                    property = events[0] === 'app' || events[0] === 'model' || events[0] === 'collection' ? events.shift() : null;

                    // add appropriate listening action
                    if (property) {
                        if (this[property]) {
                            this.listenTo(this[property], events.join(' '), callback);
                        } else {
                            throw new Error('Property does not exist.');
                        }
                    } else {
                        this.on(events.join(' '), callback);
                    }
                }, this);

                // add common selectors
                this.$body = $body;

                View.apply(this, arguments);
            }
        });
    })(Backbone.View);
});
