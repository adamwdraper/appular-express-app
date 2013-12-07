define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var Model = Backbone.Model.extend({
            defaults: {
                name: '',
                isChecked: false
            }
        });

    return Model;
});