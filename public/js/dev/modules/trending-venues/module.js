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
    var Module = Backbone.Module.extend({
            events: {},
            options: {
                lls: {
                    'San Francisco, CA': '37.7,-122.4',
                    'Phoenix, AZ': '33.4,112.0',
                    'Boston, MA': '42.3,71.0',
                    'Austin, TX': '30.2,97.7'
                }
            },
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
                this.collection.ll = this.options.lls[this.app.params.getValue('location')];

                this.collection.fetch({
                    reset: true
                });
            },
            renderVenues: function () {
                var html = '';

                this.collection.each(function (venue) {
                    html += _.template(venueTemplate, {
                        name: venue.get('name'),
                        website: venue.get('url'),
                        isOpen: venue.get('hours') ? venue.get('hours').isOpen : false
                    });
                });

                $('#trending-venues').html(html);
            }
        });

    return Module;
});