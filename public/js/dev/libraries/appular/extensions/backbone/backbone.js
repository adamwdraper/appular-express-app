/**
 * @appular app
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
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
                'events'
            ];

        return View.extend({
            config: {},
            views: {},
            plugins: {},
            listeners: {},
            constructor: function(options) {
                var modelAttributes = _.omit(options, viewOptions);

                // go ahead and set the model if sent in options
                if (options.model) {
                    this.model = options.model;
                }

                // set up on's or listenTo's from the listeners object
                _.each(this.listeners, function (value, key) {
                    var events = key.split(' '),
                        property,
                        callback = _.isFunction(value) ? value : this[value];

                    // find out if we are listening to app, model, or collection so that we can use listenTo
                    property = events[0] === 'app' || events[0] === 'model' || events[0] === 'collection' ? events.shift() : null;

                    // add appropriate listening action
                    if (property) {
                        this.listenTo(this[property], events.join(' '), callback);
                    } else {
                        this.on(events.join(' '), callback);
                    }
                }, this);

                // add options to view's model as attributes
                if (this.model) {
                    this.model.set(modelAttributes, {
                        silent: true
                    });
                } else {
                    // create new model here
                    this.model = new Backbone.Model(modelAttributes);
                }

                // propagate all model events to the view
                this.listenTo(this.model, 'all', function () {
                    this.trigger.apply(this, arguments);
                });
                
                View.apply(this, arguments);
            },
            set: function () {
                return this.model.set.apply(this.model, arguments);
            },
            get: function () {
                return this.model.get.apply(this.model, arguments);
            }
        });
    })(Backbone.View);
});