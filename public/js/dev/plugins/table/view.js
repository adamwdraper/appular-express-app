/**
 * @appular table
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './model',
    'template!./template.html',
    'template!./templates/row.html'
], function($, _, Backbone, Model, template, rowTemplate) {
    var View = Backbone.View.extend({
            template: template,
            triggers: {
                'change:body change:sortBy change:sortOrder': 'sort',
                'change:page': 'renderRows'
            },
            events: {
                'click [data-sort-by]': 'setSort'
            },
            model: new Model(),
            initialize: function () {
                _.bindAll(this, 'setSort', 'renderRows');
            },
            render: function () {
                this.$el.html(this.template({
                    head: this.get('head')
                }));

                this.$tbody = this.$el.find('tbody');

                return this;
            },
            setSort: function (event) {
                var sortBy = $(event.currentTarget).data('sortBy'),
                    sortOrder = sortBy === this.get('sortBy') && this.get('sortOrder') === 'asc' ? 'desc' : 'asc';

                this.set({
                    sortBy: sortBy,
                    sortOrder: sortOrder
                });
            },
            sort: function () {
                var sortIndex,
                    rows;

                if (this.get('sortBy')) {
                    sortIndex = this.$el.find('th[data-sort-by=' + this.get('sortBy') + ']').data('index');
                    rows = _.sortBy(this.get('body'), function (row) {
                        return _.isArray(row) ? row[sortIndex].value : row.cells[sortIndex].value;
                    }, this);

                    if (this.get('sortOrder') === 'desc') {
                        rows.reverse();
                    }

                    this.set('body', rows, {
                        silent: true
                    });
                }

                this.renderRows();
            },
            renderRows: function () {
                var html = '',
                    rows = this.get('body'),
                    row,
                    firstRow = 0,
                    i = 0,
                    count = this.get('count') || this.get('body').length;

                if (this.get('page') === 2) {
                    firstRow = this.get('count');
                } else if (this.get('page') > 2) {
                    firstRow = this.get('count') * (this.get('page') - 1);
                }

                for (i; i < count; i++) {
                    row = rows[firstRow + i];

                    html += rowTemplate({
                        classes: row.classes || [],
                        cells: _.isArray(row) ? row : row.cells
                    });
                }

                this.$tbody.html(html);
            }
        });

    return View;
});