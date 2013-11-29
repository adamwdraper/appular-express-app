/**
 * @appular demo
 */

 define([
    'jquery',
    'underscore',
    'backbone',
    'text!./templates/module.html',
    'text!./templates/venue.html',
    './collections/venues',
    'plugins/table/plugin'
], function ($, _, Backbone, template, venueTemplate, Venues, Table) {
    var Module = Backbone.Module.extend({
            events: {},
            initialize: function() {
                this.listenTo(this.app.params, 'change:keyword change:location', this.updateVenues);
            },
            render: function() {
                this.$el.html(_.template(template, {}));

                this.plugins.table = new Table({
                    el: '#recommended-table',
                    head: [
                        [
                            {
                                text: 'Name',
                                sortBy: 'name',
                                isSortable: true
                            },
                            {
                                text: 'Status',
                                sortBy: 'status',
                                isSortable: true
                            },
                            {
                                text: 'Phone'
                            }
                        ]
                    ],
                    count: 0
                }).render();
                this.listenTo(this.plugins.table, 'change:sortOrder', this.setSortOrder);
                this.listenTo(this.plugins.table, 'change:sortBy', this.setSortBy);

                this.collection = new Venues();
                this.listenTo(this.collection, 'sync', this.renderVenues);

                this.updateVenues();

                return this;
            },
            updateVenues: function () {
                this.collection.keyword = this.app.params.getValue('keyword');
                this.collection.location = this.app.params.getValue('location');

                this.collection.fetch({
                    reset: true
                });
            },
            renderVenues: function () {
                var rows = [];

                this.collection.each(function (venue) {
                    venue = venue.get('venue');

                    rows.push({
                        classes: venue.hours && venue.hours.isOpen ? ['success'] : [],
                        cells: [
                            {
                                text: _.template(venueTemplate, {
                                    name: venue.name,
                                    url: venue.url || '',
                                    address: venue.location.address
                                }),
                                value: venue.name
                            },
                            {
                                text: venue.hours ? venue.hours.status : '',
                                value: venue.hours ? venue.hours.isOpen : false
                            },
                            {
                                text: venue.contact.formattedPhone || ''
                            }
                        ]
                    });
                });

                this.plugins.table.set('body', rows);
            },
            setSortOrder: function (view, sortOrder) {
                this.app.params.setValue('sortOrder', sortOrder);
            },
            setSortBy: function (view, sortBy) {
                this.app.params.setValue('sortBy', sortBy);
            }
        });

    return Module;
});