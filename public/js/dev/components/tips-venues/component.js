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
            template: _.template(template),
            events: {},
            options: {
                lls: {
                    'San Francisco, CA': '37.7,-122.4',
                    'Phoenix, AZ': '33.4,-112.0',
                    'Boston, MA': '42.3,-71.0',
                    'Austin, TX': '30.2,-97.7'
                }
            },
            initialize: function() {
                this.listenTo(this.app, 'change:keyword change:location', this.updateVenues);
            },
            render: function() {
                this.$el.html(this.template());

                this.collection = new Venues();
                this.listenTo(this.collection, 'sync', this.renderVenues);

                this.updateVenues();

                return this;
            },
            updateVenues: function () {
                this.collection.ll = this.options.lls[this.app.get('location')];
                this.collection.keyword = this.app.get('keyword');

                this.collection.fetch({
                    reset: true
                });
            },
            renderVenues: function () {
                var html = '';

                _.each(this.collection.first(3), function (tip) {
                    var user = tip.get('user'),
                        venue = tip.get('venue');

                    html += _.template(venueTemplate, {
                        name: user.firstName + ' ' + user.lastName,
                        tip: tip.get('text'),
                        venue: {
                            name: venue.name,
                            website: venue.url
                        }
                    });
                });

                $('#tips-venues').html(html);
            }
        });

    return Module;
});