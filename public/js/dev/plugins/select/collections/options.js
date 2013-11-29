define([
    'jquery',
    'underscore',
    'backbone',
    '../models/option'
], function ($, _, Backbone, Option) {
    var Collection = Backbone.Collection.extend({
            model: Option,
            select: function (value) {
                // set all options to unselected
                this.each(function (option) {
                    option.set('isSelected', option.get('value') === value ? true : false);
                });

                this.trigger('change:selected');
            }
        });

    return Collection;
});