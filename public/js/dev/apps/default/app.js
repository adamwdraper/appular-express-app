/**
 * @appular default
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var App = Backbone.App.extend({
            events: {},
            initialize: function() {},
            render: function() {

                return this;
            }
        });

    return App;
});