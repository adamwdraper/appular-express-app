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
        $modules = $('[data-appular-module]'),
        addParams = function (paramsObject) {
            var models = [];

            _.each(paramsObject, function (value, key) {
                if (_.isString(value)) {
                    params.push({
                        id: key,
                        value: value
                    });
                }

                if (_.isObject(value)) {
                    params.push(_.extend(value, {
                        id: key
                    }));
                }
            });

            params.add(models);

            Backbone.trigger('params:initialized', renderApp);
        },
        renderApp = function () {
            app.render();
        },
        renderModules = function () {
            _.each($modules, function (element) {
                var $element = $(element),
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
                    'modules/' + $element.data('appularModule') + '/module'
                ], function (Module) {
                    var module;

                    _.extend(Module.prototype, {
                        params: params
                    });

                    module = new Module(options).render();
                });
            });
        };

    Backbone.on('app:initialized', renderModules);
    Backbone.on('params:initialized', renderApp);

    // include app
    require([
        'apps/' + $('body').data('appular-app') + '/app'
    ], function (App) {
        app = new App({
            el: $('body')
        });

        if (!_.isEmpty(app.params)) {
            addParams(app.params);
        } else {
            Backbone.trigger('params:initialized');
        }
    });
});