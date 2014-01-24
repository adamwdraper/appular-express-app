/**
 * @appular boilerplate
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var App = Backbone.App.extend({
            params: {},
            initialize: function () {},
            render: function () {
                Backbone.trigger('app:initialized');

                return this;
            }
        });

    return App;
});