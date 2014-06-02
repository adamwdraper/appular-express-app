/**
 * @appular recommendedVenues v0.0.1 - Uses keyword and location to get recommended venues from foursquare api
 */

 define([
    'jquery',
    'underscore',
    'backbone',
    'template!./templates/module.html',
    'template!./templates/venue.html',
    'template!./templates/address.html',
    './collection',
    'plugins/table/plugin',
    'plugins/pagination/plugin'
], function ($, _, Backbone, template, venueTemplate, addressTemplate, Venues, Table, Pagination) {
    var View = Backbone.View.extend({
            template: template,
            collection: new Venues(),
            events: {},
            listeners: {
                'collection sync': 'renderVenues',
                'app change:keyword change:location': 'updateVenues'
            },
            initialize: function() {},
            render: function() {
                this.$el.html(this.template());

                this.plugins.table = new Table({
                    el: '#recommended-table',
                    head: [
                        [
                            {
                                text: 'Name',
                                sortBy: 'name'
                            },
                            {
                                text: 'Price',
                                sortBy: 'price'
                            },
                            {
                                text: 'Status',
                                sortBy: 'status'
                            },
                            {
                                text: 'Address'
                            },
                            {
                                text: 'Phone'
                            }
                        ]
                    ],
                    count: this.app.get('count'),
                    sortOrder: this.app.get('sortOrder'),
                    sortBy: this.app.get('sortBy')
                }).render();
                this.listenTo(this.plugins.table, 'change:sortOrder', this.setSortOrder);
                this.listenTo(this.plugins.table, 'change:sortBy', this.setSortBy);

                this.plugins.pagination = new Pagination({
                    el: '#recommended-pagination',
                    count: this.app.get('count'),
                    page: this.app.get('page'),
                    scrollTopSelector: '#recommended-table'
                }).render();
                this.listenTo(this.plugins.pagination, 'change:page', this.setPage);

                this.updateVenues();

                return this;
            },
            updateVenues: function () {
                this.collection.keyword = this.app.get('keyword');
                this.collection.location = this.app.get('location');

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
                                text: venueTemplate({
                                    name: venue.name,
                                    url: venue.url || ''
                                }),
                                value: venue.name
                            },
                            {
                                text: venue.price ? venue.price.message : '',
                                value: venue.price ? venue.price.tier : 0
                            },
                            {
                                text: venue.hours ? venue.hours.status : '',
                                value: venue.hours ? venue.hours.isOpen : false
                            },
                            {
                                text: addressTemplate({
                                    address: venue.location.address + ' ' + this.app.get('location'),
                                    url: 'https://www.google.com/maps/preview#!q=' + encodeURIComponent(venue.location.address + ' ' + this.app.get('location'))
                                })
                            },
                            {
                                text: venue.contact.formattedPhone || ''
                            }
                        ]
                    });
                }, this);

                this.plugins.table.model.set('body', rows);
                this.plugins.pagination.model.set('total', this.collection.length);
            },
            setPage: function (view, page) {
                this.plugins.table.model.set('page', page);
                this.app.set('page', page);
            },
            setSortOrder: function (view, sortOrder) {
                this.app.set('sortOrder', sortOrder);
            },
            setSortBy: function (view, sortBy) {
                this.plugins.table.model.set('page', 1);
                this.app.set('sortBy', sortBy);
            }
        });

    return View;
});