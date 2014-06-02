define([
    'jquery',
    'underscore',
    'backbone',
    'template!./template.html'
], function($, _, Backbone, template) {
    var View = Backbone.View.extend({
            template: template,
            listeners: {
                'model sorted': 'renderRows',
                'model change:body change:sortBy change:sortOrder': 'sort',
                'model change:page': 'renderRows'
            },
            events: {},
            initialize: function () {
                _.bindAll(this, 'renderRows');
            },
            render: function () {
                if (this.model.get('body').length) {
                    this.trigger('change:body');
                }

                return this;
            },
            sort: function () {
                var sortIndex,
                    rows;

                if (this.model.get('sortBy') && this.model.get('sortIndex')) {
                    sortIndex = this.model.get('sortIndex');
                    rows = _.sortBy(this.model.get('body'), function (row) {
                        return _.isArray(row) ? row[sortIndex].value : row.cells[sortIndex].value;
                    }, this);

                    if (this.model.get('sortOrder') === 'desc') {
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
                    rows = this.model.get('body'),
                    row,
                    firstRow = 0,
                    i = 0,
                    count = this.model.get('count') || this.model.get('body').length;

                if (this.model.get('page') === 2) {
                    firstRow = this.model.get('count');
                } else if (this.model.get('page') > 2) {
                    firstRow = this.model.get('count') * (this.model.get('page') - 1);
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