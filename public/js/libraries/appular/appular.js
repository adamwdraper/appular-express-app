/**
 * @appular appular v4.0.0
 * @link https://github.com/adamwdraper/Appular
 * @define appular
 */

// Appular
// version : 4.0.0
// author : Adam Draper
// license : MIT
// https://github.com/adamwdraper/Appular

define([
    'module',
    'jquery',
    'underscore',
    'backbone',
    'libraries/backbone/extensions/stickit',
    'libraries/backbone/extensions/appular',
    'libraries/appular/extensions/app/app'
], function (module, $, _, Backbone) {
    var Appular = {};

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

        require([
            path
        ], function (Component) {
            Appular.log('Component', name, path);

            _.extend(Component.prototype, {
                app: Appular.app
            });

            Appular.components[name] = new Component(options);

            Backbone.trigger('appular:component:required', Appular.components[name]);
        });
    };

    // add config to backbone objects
    _.extend(Backbone.App.prototype, {
        config: Appular.config
    });

    _.extend(Backbone.View.prototype, {
        config: Appular.config
    });

    _.extend(Backbone.Collection.prototype, {
        config: Appular.config
    });

    _.extend(Backbone.Model.prototype, {
        config: Appular.config
    });

    // add config for template variable syntax
    _.templateSettings = {
        evaluate: /\{\{#([\s\S]+?)\}\}/g, // {{# console.log("blah") }}
        interpolate: /\{\{\{([\s\S]+?)\}\}\}/g, // {{{ title }}}
        escape: /\{\{[^#\{]([\s\S]+?)[^\}]\}\}/g, // {{ title }}
    };
    
    return Appular;
});