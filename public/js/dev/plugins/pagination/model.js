define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var Model = Backbone.Model.extend({
            defaults: {
                page: 1,
                total: 1,
                count: 1,
                items: 7,
                scrollTopSelector: 'html, body'
            }
        });

    return Model;
});