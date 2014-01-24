/**
 * @appular boilerplate
 */
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
                var user = this.get('user'),
                    venue = this.get('venue');

                this.$el.html(this.template({
                    name: user.firstName + ' ' + user.lastName,
                    tip: this.get('text'),
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