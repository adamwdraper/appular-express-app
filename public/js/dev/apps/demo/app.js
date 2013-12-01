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
                    value: 'tacos'
                },
                location: {
                    value: 'San Francisco, CA'
                },
                sortBy: {
                    value: ''
                },
                sortOrder: {
                    value: 'asc'
                },
                page: {
                    value: 1
                },
                count: {
                    value: 10,
                    addToUrl: false
                }
            },
            initialize: function () {
                this.on('change', function () {
                    console.log(arguments);
                });
            },
            render: function () {
                Backbone.trigger('app:initialized');

                return this;
            }
        });

    return App;
});