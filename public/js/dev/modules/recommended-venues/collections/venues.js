define([
    'jquery',
    'underscore',
    'backbone',
    'utilities/foursquare/utility'
], function ($, _, Backbone, foursquare) {
    var Collection = Backbone.Collection.extend({
            url: function () {
                return 'https://api.foursquare.com/v2/venues/explore?query=' + this.keyword + '&near=' + this.location + '&client_id=' + foursquare.clientId + '&client_secret=' + foursquare.clientSecret + '&v=20131120';
            },
            parse: function (response) {
                return response.response.groups[0].items;
            }
        });

    return Collection;
});