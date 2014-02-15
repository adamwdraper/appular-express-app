define([
    'jquery',
    'underscore',
    'backbone',
    './docs'
], function ($, _, Backbone, docs) {
    var Model = Backbone.Model.extend({
            defaults: {
                docs: docs,
                view: ''
            }
        });

    return Model;
});