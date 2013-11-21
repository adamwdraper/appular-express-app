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
                'normal': {
                    value: 'normal'
                },
                'noshow': {
                    value: 'hide',
                    addToUrl: false
                },
                'alias': {
                    value: '',
                    alias: 'a'
                },
                'string': 'string',
                'array': {
                    value: []
                },
                'cookie': {
                    loadFromCookie: true
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