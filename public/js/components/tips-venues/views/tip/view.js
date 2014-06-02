define([
    'jquery',
    'underscore',
    'backbone',
    'template!./template.html'
], function ($, _, Backbone, template) {
    var View = Backbone.View.extend({
            template: template,
            events: {},
            initialize: function () {},
            render: function () {
                var user = this.model.get('user'),
                    venue = this.model.get('venue');

                this.$el.html(this.template({
                    name: user.firstName + ' ' + user.lastName,
                    tip: this.model.get('text'),
                    venue: {
                        name: venue.name,
                        website: venue.url
                    }
                }));

                return this;
            }
        });

    return View;
});