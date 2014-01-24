define([
    'jquery',
    'underscore',
    'backbone',
    './collection',
    'template!./template.html'
], function ($, _, Backbone, Options, template) {
    var View = Backbone.View.extend({
            template: template,
            events: {
                'click [data-value]': 'select'
            },
            initialize: function () {},
            render: function () {
                var options = [];

                _.each(this.get('options'), function (option) {
                    options.push(_.isObject(option) ? option : {
                        text: option,
                        value: option
                    });
                });

                this.collection = new Options(options);
                this.listenTo(this.collection, 'change:selected', this.setToggleText);

                this.$el.html(this.template({
                    options: this.collection.toJSON()
                }));

                this.collection.select(this.get('value'));

                return this;
            },
            select: function (event) {
                var value = $(event.currentTarget).data('value');

                this.collection.select(value);
                this.set('value', value);

                event.preventDefault();
            }
        });

    return View;
});