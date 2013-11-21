define([
    'jquery',
    'underscore',
    'backbone',
    'utilities/foursquare/utility'
], function ($, _, Backbone, foursquare) {
    var Collection = Backbone.Collection.extend({
            url: function () {
                return 'https://api.foursquare.com/v2/tips/search?query=' + this.keyword + '&ll=' + this.ll + '&limit=10&client_id=' + foursquare.clientId + '&client_secret=' + foursquare.clientSecret + '&v=20131120';
            },
            parse: function (response) {
                return response.response.tips;
            }
        });

    return Collection;
});