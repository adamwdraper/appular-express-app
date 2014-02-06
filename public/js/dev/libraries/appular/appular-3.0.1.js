// Appular
// version : 3.0.1
// author : Adam Draper
// license : MIT
// https://github.com/adamwdraper/Appular
define([
    'module',
    'domReady!',
    'jquery',
    'underscore',
    'backbone',
    'libraries/appular/extensions/backbone/backbone',
    'libraries/appular/extensions/app/app'
], function (module, doc, $, _, Backbone) {
    var Appular = {
            version: '3.0.1'
        },
        app,
        log = function () {
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
        },
        requireApp = function () {
            var $element = $('body'),
                name = $element.data('appularApp'),
                path = 'apps/' + name + '/app';

            // require app or through error if none defined
            if (name) {
                require([
                    path
                ], function (App) {
                    // log load in dev
                    log('App', name, path);

                    app = new App({
                        el: $element,
                        config: module.config()
                    });

                    Backbone.history.start({
                        root: window.location.pathname
                    });
                });

            } else {
                throw new Error('Appular : No app found');
            }
        },
        renderComponents = function () {
            var $components = $('[data-appular-component]');

            _.each($components, function (element) {
                var $element = $(element),
                    name = $element.data('appularComponent'),
                    path = 'components/' + name + '/component',
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
                        app: app,
                        config: module.config()
                    });

                    component = new Component(options).render();
                });
            });
        };

    // render app when all params are loaded
    Backbone.on('params:initialized', function () {
        app.render();
    });

    // Render all components when app is ready
    Backbone.on('app:initialized', renderComponents);

    // log major libraries being used
    log('Library', 'Appular', 'v' + Appular.version);
    log('Library', 'jQuery', 'v' + $().jquery);
    log('Library', 'Backbone', 'v' + Backbone.VERSION);
    log('Library', 'Underscore', 'v' + _.VERSION);

    // Get this party started
    requireApp();
});