/**
 * @appular default
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
                Backbone.trigger('app:rendered');

                return this;
            }
        });

    return App;
});