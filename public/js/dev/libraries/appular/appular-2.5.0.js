// Appular
// version : 2.5.0
// author : Adam Draper
// license : MIT
// https://github.com/adamwdraper/Appular
define([
    'module',
    'domReady!',
    'jquery',
    'underscore',
    'backbone',
    'libraries/appular/extensions/params/params',
    'libraries/appular/extensions/router/router',
    'libraries/appular/extensions/app/app'
], function (module, doc, $, _, Backbone, Params, Router) {
    var app,
        params = new Params(),
        $components = $('[data-appular-component]'),
        log = function (type, name, path) {
            if (module.config().env === 'develop') {
                console.log('Appular : ' + type + ' : ' + name + ' : ' + path);
            }
        },
        requireApp = function () {
            var $element = $('body'),
                name = $element.data('appularApp'),
                path = 'apps/' + name + '/view';

            if (name) {
                require([
                    path
                ], function (App) {
                    var models = [],
                        options = {
                            el: $element
                        };

                    log('App', name, path);

                    app = new App(options);
                    
                    // add any params to collection
                    _.each(app.params, function (value, key) {
                        var model = {
                                id: key
                            };

                        if (_.isString(value)) {
                            model.value = value;
                        }

                        if (_.isObject(value)) {
                            model = _.extend(model, value);
                        }

                        // set the value of any param by data attribute on body
                        if ($element.data(key)) {
                            model.value = $element.data(key);
                        }

                        models.push(model);
                    });

                    params.add(models);
                    app._params = params;
                    app.config = module.config();

                    // pass through params collection changes
                    app._params.on('all', function () {
                        var args = Array.prototype.slice.call(arguments),
                            event = args.shift();
                        if (event !== 'change:value') {
                            this.trigger(event, args);
                        }
                    }, app);


                    // create router and add params collection
                    _.extend(Router.prototype, {
                        _params: params
                    });
                    app.router = new Router();

                    Backbone.history.start({
                        root: window.location.pathname
                    });
                });
            } else {
                throw new Error('Appular : No app found');
            }
        },
        renderComponents = function () {
            _.each($components, function (element) {
                var $element = $(element),
                    name = $element.data('appularComponent'),
                    path = 'components/' + name + '/view',
                    options = {
                        el: $element
                    };

                // add any data attributes to the components options
                _.each($element.data(), function (value, key) {
                    if (key !== 'appularComponent') {
                        options[key] = value;
                    }
                });
                
                require([
                    path
                ], function (Component) {
                    var component;

                    log('Component', name, path);

                    _.extend(Component.prototype, {
                        app: app
                    });

                    component = new Component(options).render();
                });
            });
        };


    // add configs and custom functions to models, views, and collections
    Backbone.Model = (function(Model) {
        return Model.extend({
            config: module.config(),
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
            config: module.config(),
            fetch: function (options) {
                if (this.fixture && this.config.useFixtures) {
                    options.url = this.fixture;
                }

                return Collection.prototype.fetch.apply(this, arguments);
            }
        });
    })(Backbone.Collection);

    Backbone.Controller = Backbone.View = (function(View) {
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
            config: module.config(),
            views: {},
            plugins: {},
            triggers: {},
            constructor: function(options) {
                var modelAttributes = _.omit(options, viewOptions);

                _.each(this.triggers, function (value, key) {
                    this.on(key, this[value]);
                }, this);

                if (this.model) {
                    this.model.set(modelAttributes, {
                        silent: true
                    });
                } else {
                    // create new model here
                    this.model = new Backbone.Model(modelAttributes);
                }

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


    // Render App when all params are loaded
    Backbone.on('params:initialized', function () {
        app.render();
    });

    // Render all components when app is ready
    Backbone.on('app:initialized', renderComponents);

    // Get this party started
    requireApp();
});