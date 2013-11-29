/**
 * @appular table
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!./templates/plugin.html',
    'text!./templates/row.html'
], function($, _, Backbone, template, rowTemplate) {
    var Plugin = Backbone.Plugin.extend({
            events: {
                'click [data-sort-by]': 'setSort'
            },
            options: {
                body: [],
                head: [],
                sortBy: '',
                sortIndex: '',
                sortOrder: 'asc',
                page: 1,
                count: 25
            },
            initialize: function () {
                _.bindAll(this, 'setSort', 'renderRows');

                this.on('sort', this.sort);
                this.on('change:body change:page', this.renderRows);
            },
            render: function () {
                this.$el.html(_.template(template, {
                    head: this.get('head')
                }));

                this.$tbody = this.$el.find('tbody');

                this.trigger('sort');

                return this;
            },
            setSort: function (event) {
                var sortBy = $(event.currentTarget).data('sortBy'),
                    sortOrder = sortBy === this.get('sortBy') && this.get('sortOrder') === 'asc' ? 'desc' : 'asc';

                this.set({
                    sortBy: sortBy,
                    sortOrder: sortOrder
                });

                this.trigger('sort');
            },
            sort: function () {
                var rows;

                this.set('sortIndex', this.$el.find('th[data-sort-by=' + this.get('sortBy') + ']').data('index'));

                rows = _.sortBy(this.get('body'), function (row) {
                    return _.isArray(row) ? row[this.get('sortIndex')].value : row.cells[this.get('sortIndex')].value;
                }, this);

                if (this.get('sortOrder') === 'desc') {
                    rows.reverse();
                }

                this.set('body', rows);
            },
            renderRows: function () {
                var html = '',
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
                    row = this.get('body')[firstRow + i];

                    html += _.template(rowTemplate, {
                        classes: row.classes || [],
                        cells: _.isArray(row) ? row : row.cells
                    });
                }

                this.$tbody.html(html);
            }
        });

    return Plugin;
});