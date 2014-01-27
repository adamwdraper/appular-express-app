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
            options: new Model(),
            bindings: {
                '[data-toggle-text]': 'value'
            },
            listeners: {},
            events: {
                'click [data-action="toggle"]': 'toggle'
            },
            initialize: function () {
                _.bindAll(this, 'toggle');
            },
            render: function () {
                var _this = this;

                $(document).on('click', function () {
                    _this.closeAll();
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
            toggle: function (e) {
                this.$el.toggleClass('open');
                this.set('isOpen', !this.get('isOpen'));

                // close all other selects
                _.each(selects, function (select) {
                     if (select.cid !== this.cid) {
                        select.close();
                    }
                }, this);

                e.preventDefault();
                e.stopPropagation();
            },
            open: function () {
                this.$el.addClass('open');
                this.set('isOpen', true);
            },
            close: function () {
                this.$el.removeClass('open');
                this.set('isOpen', false);
            },
            closeAll: function () {
                _.each(selects, function(select) {
                    select.close();
                });
            }
        });

    return View;
});