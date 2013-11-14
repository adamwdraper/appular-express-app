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
            initialize: function () {},
            render: function () {
                Backbone.trigger('app:initialized');

                return this;
            }
        });

    return App;
});