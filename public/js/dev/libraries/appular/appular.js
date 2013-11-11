// Appular Sites
// version : 1.0.0
// author : Adam Draper
// license : MIT
// https://github.com/adamwdraper/Appular
require([
    'domReady!',
    'jquery',
    'underscore',
    'backbone',
    'libraries/appular/extensions/view',
    'libraries/appular/extensions/app/app'
], function (doc, $, _, Backbone) {
    var app,
        $modules = $('[data-appular-module]'),
        startHistory = _.after($modules.length, function () {
            Backbone.history.start({
                pushState: true
            });
        }),
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
                    var module = new Module(options);

                    module.app = app;
                    
                    // if module has any params add them to the params utility
                    if (!_.isEmpty(module.params)) {

                    }

                    module.render();

                    startHistory();
                });
            });
        };

    // Backbone.on('app:initialized', );

    // include app
    require([
        'apps/' + $('body').data('appular-app') + '/app'
    ], function (App) {
        app = new App({
            el: $('body')
        }).render();

        renderModules();
    });
});