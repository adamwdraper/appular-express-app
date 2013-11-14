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
                    loadFromCookie: false
                },
                'noshow': {
                    value: '12345',
                    alias: '',
                    addToUrl: false
                },
                'keyword': {
                    value: '12345',
                    alias: 'k'
                },
                'test': '123',
                'array': {
                    value: [
                        'maynard',
                        'danny',
                        'adam',
                        'justin'
                    ]
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