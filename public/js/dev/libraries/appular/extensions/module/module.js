/**
 * @appular module
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    Backbone.Module = Backbone.View.extend({
        plugins: {},
        views: {}
    });
});