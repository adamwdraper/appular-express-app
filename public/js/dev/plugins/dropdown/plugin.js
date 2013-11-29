define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var dropdowns = [],
        View = Backbone.View.extend({
            options: {
                isOpen: false
            },
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

                // add to array of all dropdowns on page
                dropdowns.push(this);

                return this;
            },
            toggle: function (e) {
                this.$el.toggleClass('open');
                this.options.isOpen = !this.options.isOpen;

                // close all other dropdowns
                _.each(dropdowns, function (dropdown) {
                     if (dropdown.cid !== this.cid) {
                        dropdown.close();
                    }
                }, this);

                e.preventDefault();
                e.stopPropagation();
            },
            open: function () {
                this.$el.addClass('open');
                this.options.isOpen = true;
            },
            close: function () {
                this.$el.removeClass('open');
                this.options.isOpen = false;
            },
            closeAll: function () {
                _.each(dropdowns, function(dropdown) {
                    dropdown.close();
                });
            }
        });

    return View;
});