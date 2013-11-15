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
                    value: '',
                    alias: '',
                    addToHistory: true,
                    addToUrl: true,
                    loadFromCookie: false
                },
                'noshow': {
                    value: '',
                    alias: '',
                    addToUrl: false
                },
                'keyword': {
                    value: '',
                    alias: 'k'
                },
                'test': '',
                'array': {
                    value: []
                }
            },
            initialize: function () {},
            render: function () {
                Backbone.trigger('app:initialized');

                return this;
            }
        });

    return App;
});