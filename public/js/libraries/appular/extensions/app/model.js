define([
    'backbone'
], function(Backbone) {
    var Model = Backbone.Model.extend({
            defaults: {
                id: '',
                value: '',
                alias: '',
                addToHistory: true,
                addToUrl: true,
                loadFromCookie: false
            }
        });

    return Model;
});