define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var Model = Backbone.Model.extend({
            defaults: {
                body: [],
                head: [],
                sortBy: '',
                sortOrder: 'asc',
                sortIndex: '',
                page: 1,
                count: 25
            }
        });

    return Model;
});