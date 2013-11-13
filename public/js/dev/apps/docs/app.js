/**
 * @appular docs
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var App = Backbone.App.extend({
            params: {
                'filter': {
                    value: '12345',
                    alias: '',
                    addToHistory: true,
                    addToUrl: true,
                    loadFromCookie: false,
                    isArray: false
                },
                'test': '123'
            },
            routes: {
                'help/:page': 'help'
            },
            initialize: function () {},
            render: function () {
                console.log('app render');

                Backbone.trigger('app:initialized');

                return this;
            },
            help: function () {
                console.log('route: help');
            }
        });

    return App;
});