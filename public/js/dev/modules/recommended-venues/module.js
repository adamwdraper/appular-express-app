/**
 * @appular demo
 */

 define([
    'jquery',
    'underscore',
    'backbone',
    'text!./templates/module.html',
    'text!./templates/venue.html',
    './collections/venues'
], function ($, _, Backbone, template, venueTemplate, Venues) {
    var view = Backbone.View.extend({
            events: {},
            initialize: function() {
                this.listenTo(this.app.params, 'change', this.updateVenues);
            },
            render: function() {
                this.$el.html(_.template(template, {}));

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
                var html = '';

                this.collection.each(function (venue) {
                    var v = venue.get('venue');

                    html += _.template(venueTemplate, {
                        name: v.name,
                        address: v.location.address,
                        website: v.url || '',
                        phone: v.contact.formattedPhone || '',
                        status: v.hours ? v.hours.status : '',
                        isOpen: v.hours ? v.hours.isOpen : ''
                    });
                });

                $('#recommended-venues').html(html);
            }
        });

    return view;
});