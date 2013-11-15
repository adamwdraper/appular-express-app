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
                'view': {
                    value: 'libraries',
                    alias: 'v'
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