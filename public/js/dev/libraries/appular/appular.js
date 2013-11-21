// Appular Sites
// version : 2.0.0
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
    'libraries/appular/extensions/app/app',
    'libraries/appular/extensions/module/module',
    'libraries/appular/extensions/plugin/plugin'
], function (module, doc, $, _, Backbone, Params, Router) {
    var app,
        params = new Params(),
        $modules = $('[data-appular-module]'),
        log = function (type, name, path) {
            if (module.config().env === 'develop') {
                console.log('Appular : ' + type + ' : ' + name + ' : ' + path);
            }
        },
        renderApp = function () {
            var $element = $('body'),
                name = $element.data('appularApp'),
                path = 'apps/' + name + '/app';

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
                    app.params = params;
                    app.config = module.config();

                    // create router and add params collection
                    _.extend(Router.prototype, {
                        params: params
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
        renderModules = function () {
            _.each($modules, function (element) {
                var $element = $(element),
                    name = $element.data('appularModule'),
                    path = 'modules/' + name + '/module',
                    options = {
                        el: $element
                    };

                // add any data attributes to the modules options
                _.each($element.data(), function (value, key) {
                    if (key !== 'appularModule') {
                        options[key] = value;
                    }
                });
                
                require([
                    path
                ], function (Module) {
                    var module;

                    log('Module', name, path);

                    _.extend(Module.prototype, {
                        app: app
                    });

                    module = new Module(options).render();
                });
            });
        };

    Backbone.on('router:initialized', function () {
        app.render();
    });
    Backbone.on('app:initialized', renderModules);

    renderApp();
});