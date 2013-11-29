define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var Model = Backbone.Model.extend({
            defaults: {
                text: '',
                value: '',
                isSelected: false
            }
        });

    return Model;
});