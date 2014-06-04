define([
    'jquery',
    'underscore',
    'backbone',
    './model',
    'template!./template.html',
    './views/select/view'
], function ($, _, Backbone, Model, template, Select) {
    var selects = [],
        View = Backbone.View.extend({
            template: template,
            model: Model,
            bindings: {
                '[data-toggle-text]': 'value',
                ':el': {
                    attributes: [
                        {
                            name: 'class',
                            observe: 'isOpen',
                            onGet: 'formatOpenClass'
                        }
                    ]
                }
            },
            listeners: {
                'model change:value': 'triggerChange'
            },
            events: {
                'click [data-action="toggle"]': 'toggle'
            },
            initialize: function () {
                _.bindAll(this, 'toggle', 'closeAll');
            },
            render: function () {
                $(document).on('click', this.closeAll);

                this.model.set({
                    options: this.options.options,
                    value: this.options.value
                });

                this.$el.html(this.template());

                this.views.selects = new Select({
                    el: this.$el.find('[data-items]'),
                    model: this.model
                }).render();

                // add to array of all selects on page
                selects.push(this);

                this.stickit();

                return this;
            },
            toggle: function (event) {
                event.preventDefault();
                event.stopPropagation();
                
                this.model.set('isOpen', !this.model.get('isOpen'));

                // close all other selects
                _.each(selects, function (select) {
                     if (select.cid !== this.cid) {
                        select.close();
                    }
                }, this);
            },
            open: function () {
                this.model.set('isOpen', true);
            },
            close: function () {
                this.model.set('isOpen', false);
            },
            closeAll: function () {
                _.each(selects, function(select) {
                    select.close();
                });
            },
            formatOpenClass: function (value) {
                return value ? 'open' : '';
            },
            triggerChange: function (model, value) {
                this.trigger('change', value);
            }
        });

    return View;
});