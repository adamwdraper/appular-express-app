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
                keyword: {
                    value: 'tacos',
                    alias: 'k'
                },
                location: {
                    value: 'San Francisco, CA',
                    alias: 'l'
                },
                sortBy: {
                    value: '',
                    alias: 's'
                },
                sortOrder: {
                    value: 'asc',
                    alias: 'o'
                },
                sortIndex: {
                    value: '',
                    alias: 'i'
                },
                page: {
                    value: 1,
                    alias: 'p',
                    type: 'number'
                },
                count: {
                    value: 10,
                    addToUrl: false,
                    type: 'number'
                }
            },
            initialize: function () {},
            render: function () {
                Backbone.trigger('appular:app:rendered');

                return this;
            }
        });

    return App;
});