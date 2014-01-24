define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var Model = Backbone.Model.extend({
            defaults: {
                isOpen: false,
                options: [],
                value: ''
            }
        });

    return Model;
});