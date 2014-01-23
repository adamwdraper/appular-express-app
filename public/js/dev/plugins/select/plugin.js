define([
    'jquery',
    'underscore',
    'backbone',
    './collections/options',
    './models/plugin',
    'template!./templates/plugin.html'
], function ($, _, Backbone, Options, Model, template) {
    var selects = [],
        Controller = Backbone.Controller.extend({
            template: template,
            model: new Model(),
            triggers: {
                'change:value': 'setToggleText'
            },
            events: {
                'click [data-action="toggle"]': 'toggle',
                'click [data-value]': 'select'
            },
            initialize: function () {
                _.bindAll(this, 'toggle', 'setToggleText');
            },
            render: function () {
                var _this = this,
                    options = [];

                $(document).on('click', function () {
                    _this.closeAll();
                });

                _.each(this.model.get('options'), function (option) {
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

                this.$toggleText = this.$el.find('[data-toggle-text]');

                this.collection.select(this.model.get('value'));

                // add to array of all selects on page
                selects.push(this);

                return this;
            },
            setToggleText: function () {
                this.$toggleText.text(this.model.get('value'));
            },
            select: function (event) {
                var value = $(event.currentTarget).data('value');

                this.collection.select(value);
                this.model.set('value', value);

                event.preventDefault();
            },
            toggle: function (e) {
                this.$el.toggleClass('open');
                this.model.set('isOpen', !this.model.get('isOpen'));

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
            }
        });

    return Controller;
});