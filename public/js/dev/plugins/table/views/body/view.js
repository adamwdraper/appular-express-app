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
            listeners: {
                'sorted': 'renderRows',
                'change:body change:sortBy change:sortOrder': 'sort',
                'change:page': 'renderRows'
            },
            events: {},
            initialize: function () {
                _.bindAll(this, 'renderRows');
            },
            render: function () {
                if (this.get('body').length) {
                    this.trigger('change:body');
                }

                return this;
            },
            sort: function () {
                var sortIndex,
                    rows;

                if (this.get('sortBy') && this.get('sortIndex')) {
                    sortIndex = this.get('sortIndex');
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

                this.trigger('sorted');
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

                    html += template({
                        classes: row.classes || [],
                        cells: _.isArray(row) ? row : row.cells
                    });
                }

                this.$el.html(html);
            }
        });

    return View;
});