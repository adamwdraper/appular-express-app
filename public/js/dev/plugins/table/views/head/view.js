/**
 * @appular table
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'template!./template.html'
], function($, _, Backbone, template) {
    var View = Backbone.View.extend({
            template: template,
            events: {
                'click [data-sort-by]': 'setSort'
            },
            initialize: function () {
                _.bindAll(this, 'setSort');
            },
            render: function () {
                this.$el.html(this.template({
                    rows: this.model.get('head')
                }));

                return this;
            },
            setSort: function (event) {
                var sortBy = $(event.currentTarget).data('sortBy'),
                    sortIndex = $(event.currentTarget).data('index'),
                    sortOrder = sortBy === this.get('sortBy') && this.get('sortOrder') === 'asc' ? 'desc' : 'asc';

                this.model.set({
                    sortBy: sortBy,
                    sortIndex: sortIndex,
                    sortOrder: sortOrder
                });
            }
        });

    return View;
});