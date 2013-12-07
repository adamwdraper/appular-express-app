define([
    'jquery',
    'underscore',
    'backbone',
    '../models/child'
], function ($, _, Backbone, Child) {
    var Collection = Backbone.Collection.extend({
            model: Child
        });

    return Collection;
});