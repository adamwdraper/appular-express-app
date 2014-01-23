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
            options: new Model(),
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

                this.$toggleText = this.$el.find('[data-toggle-text]');

                this.collection.select(this.get('value'));

                // add to array of all selects on page
                selects.push(this);

                return this;
            },
            setToggleText: function () {
                this.$toggleText.text(this.get('value'));
            },
            select: function (event) {
                var value = $(event.currentTarget).data('value');

                this.collection.select(value);
                this.set('value', value);

                event.preventDefault();
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

    return Controller;
});