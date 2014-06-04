/**
 * @appular appular v4.0.1
 * @link https://github.com/adamwdraper/Appular
 * @define appular
 */

// Appular
// version : 4.0.1
// author : Adam Draper
// license : MIT
// https://github.com/adamwdraper/Appular

define([
    'module',
    'jquery',
    'underscore',
    'backbone',
    'libraries/backbone/extensions/stickit',
    'libraries/appular/extensions/app/app'
], function (module, $, _, Backbone) {
    var Appular = {},
        $body = $('body'),
        viewOptions = [
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

    Appular.version = '4.0.0';

    Appular.app = '';

    Appular.components = {};

    Appular.config = module.config();

    Appular.log = function () {
        var colors = {
                Library: 'FC913A',
                App: '00A8C6',
                Component: '40C0CB',
                Event: '8FBE00'
            },
            info = Array.prototype.slice.call(arguments);

        if (module.config().env === 'develop') {
            console.log('%c' + info.join(' : '), 'color: #' + colors[info[0]]);
        }
    };

    Appular.require = {};

    Appular.require.app = function (name, options) {
        var path = 'apps/' + name + '/app';

        options = options || {};

        _.extend(options, {
            el: $('body')
        });

        require([
            path
        ], function (App) {
            // log load in dev
            Appular.log('App', name, path);

            Appular.app = new App(options);

            Backbone.trigger('appular:app:required', Appular.app);
        });
    };
    
    Appular.require.component = function (name, options) {
        var path = 'components/' + name + '/component';

        options = options || {};

        options.app = Appular.app;

        require([
            path
        ], function (Component) {
            Appular.log('Component', name, path);

            Appular.components[name] = new Component(options);

            Backbone.trigger('appular:component:required', Appular.components[name]);
        });
    };

    // Extending backbone objects
    _.extend(Backbone.App.prototype, {
        config: Appular.config
    });

    Backbone.View = (function(View) {
        return View.extend({
            config: Appular.config,
            listeners: {},
            constructor: function(options) {
                this.plugins = {};
                this.views = {};

                options = options || {};

                if (options.app) {
                    this.app = options.app;
                }

                if (options.model) {
                    this.model = options.model;
                }

                // instantiate model if it is uninstantiated
                if (typeof this.model === 'function') {
                    this.model = new this.model();
                }

                // instantiate collection if it is uninstantiated
                if (typeof this.collection === 'function') {
                    this.model = new this.model();
                }

                // pass any options throught to model to be attributes
                if (this.model) {
                    this.model.set(_.omit(options, viewOptions));
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
    
    Backbone.Collection = (function(Collection) {
        return Collection.extend({
            config: Appular.config,
            fetch: function (options) {
                if (this.fixture && this.config.useFixtures) {
                    options.url = this.fixture;
                }

                return Collection.prototype.fetch.apply(this, arguments);
            }
        });
    })(Backbone.Collection);

    Backbone.Model = (function(Model) {
        return Model.extend({
            config: Appular.config,
            fetch: function (options) {
                if (this.fixture && this.config.useFixtures) {
                    options.url = this.fixture;
                }

                return Model.prototype.fetch.apply(this, arguments);
            }
        });
    })(Backbone.Model);

    // add config for template variable syntax
    _.templateSettings = {
        evaluate: /\{\{#([\s\S]+?)\}\}/g, // {{# console.log("blah") }}
        interpolate: /\{\{\{([\s\S]+?)\}\}\}/g, // {{{ title }}}
        escape: /\{\{[^#\{]([\s\S]+?)[^\}]\}\}/g, // {{ title }}
    };
    
    return Appular;
});