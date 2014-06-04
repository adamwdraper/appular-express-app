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
            model: new Model(),
            bindings: {
                '[data-toggle-text]': 'value'
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

                this.$el.html(this.template());

                this.views.selects = new Select({
                    el: this.$el.find('[data-items]'),
                    model: this.model,
                    options: this.options.options,
                    value: this.options.value
                }).render();

                // add to array of all selects on page
                selects.push(this);

                this.stickit();

                return this;
            },
            toggle: function (event) {
                event.preventDefault();
                event.stopPropagation();
                
                this.$el.toggleClass('open');
                this.model.set('isOpen', !this.model.get('isOpen'));

                // close all other selects
                _.each(selects, function (select) {
                     if (select.cid !== this.cid) {
                        select.close();
                    }
                }, this);
            },
            open: function () {
                this.$el.addClass('open');
                this.model.set('isOpen', true);
            },
            close: function () {
                this.$el.removeClass('open');
                this.model.set('isOpen', false);
            },
            closeAll: function () {
                _.each(selects, function(select) {
                    select.close();
                });
            },
            triggerChange: function (model, value) {
                this.trigger('change', value);
            }
        });

    return View;
});