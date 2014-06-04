define([
    'jquery',
    'underscore',
    'backbone',
    './collection',
    'template!./template.html'
], function ($, _, Backbone, Collection, template) {
    var View = Backbone.View.extend({
            template: template,
            listeners: {
                'model change:value': 'triggerChange'
            },
            events: {
                'click [data-value]': 'select'
            },
            initialize: function () {},
            render: function () {
                var options = [];

                _.each(this.model.get('options'), function (option) {
                    options.push(_.isObject(option) ? option : {
                        text: option,
                        value: option
                    });
                });

                this.collection = new Collection(options);

                this.$el.html(this.template({
                    options: this.collection.toJSON()
                }));

                this.collection.select(this.model.get('value'));

                return this;
            },
            select: function (event) {
                var value = $(event.currentTarget).data('value');

                this.collection.select(value);
                this.model.set('value', value);

                event.preventDefault();
            },
            triggerChange: function (option, value) {
                this.trigger('change:value', option, value);
            }
        });

    return View;
});