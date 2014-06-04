define([
    'jquery',
    'underscore',
    'backbone',
    './model'
], function ($, _, Backbone, Option) {
    var Collection = Backbone.Collection.extend({
            model: Option,
            select: function (value) {
                // set all options isSelected attribute
                this.each(function (option) {
                    option.set('isSelected', option.get('value') === value ? true : false);
                });

                this.trigger('change:selected');
            }
        });

    return Collection;
});