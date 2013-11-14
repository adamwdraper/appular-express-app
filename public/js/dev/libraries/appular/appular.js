// Appular Sites
// version : 1.1.0
// author : Adam Draper
// license : MIT
// https://github.com/adamwdraper/Appular
require([
    'domReady!',
    'jquery',
    'underscore',
    'backbone',
    'libraries/appular/extensions/params/params',
    'libraries/appular/extensions/app/app',
    'libraries/appular/extensions/module/module',
    'libraries/appular/extensions/plugin/plugin'
], function (doc, $, _, Backbone, Params) {
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

                // turn app params into collection
                app.params = params;

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
        };

    Backbone.on('app:initialized', renderModules);

    renderApp();
});