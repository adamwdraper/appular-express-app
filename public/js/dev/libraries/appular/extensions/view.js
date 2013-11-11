/**
 * @appular view
 */

define([
        'underscore',
        'backbone'
], function (_, Backbone) {
    _.extend(Backbone.View.prototype, {
        plugins: {},
        views: {},
        models: {},
        collections: {},
        params: {}
    });
});