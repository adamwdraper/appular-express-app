// Appular Sites
// version : 1.2.0
// author : Adam Draper
// license : MIT
// https://github.com/adamwdraper/Appular
require([
    'domReady!',
    'jquery',
    'underscore',
    'backbone',
    'libraries/appular/extensions/params/params',
    'libraries/appular/extensions/router/router',
    'libraries/appular/extensions/app/app',
    'libraries/appular/extensions/module/module',
    'libraries/appular/extensions/plugin/plugin'
], function (doc, $, _, Backbone, Params, Router) {
    var app,
        params = new Params(),
        isDebug = true,
        $modules = $('[data-appular-module]'),
        log = function (type, name, path) {
            if (isDebug) {
                console.log('Appular : ' + type + ' : ' + name + ' : ' + path);
            }
        },
        renderApp = function () {
            var name = $('body').data('appular-app'),
                path = 'apps/' + name + '/app';

            require([
                path
            ], function (App) {
                var models = [];

                log('App', name, path);

                app = new App({
                    el: $('body')
                });
                
                // add any params to collection
                _.each(app.params, function (value, key) {
                    if (_.isString(value)) {
                        models.push({
                            id: key,
                            value: value
                        });
                    }

                    if (_.isObject(value)) {
                        models.push(_.extend(value, {
                            id: key
                        }));
                    }
                });
                params.add(models);
                app.params = params;

                // create router and add params collection
                _.extend(Router.prototype, {
                    params: params
                });
                app.router = new Router();

                app.render();
            });
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

            Backbone.history.start({
                root: window.location.pathname
            });
        };

    Backbone.on('app:initialized', renderModules);

    renderApp();
});