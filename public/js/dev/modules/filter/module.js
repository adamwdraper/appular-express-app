/**
 * @appular boilerplate
 */

 define([
    'jquery',
    'underscore',
    'backbone',
    'text!./templates/module.html'
], function ($, _, Backbone, template) {
    var Module = Backbone.Module.extend({
            events: {},
            initialize: function() {},
            render: function() {
                this.$el.html(_.template(template, {
                    locations: [
                        'San Francisco, CA',
                        'Phoenix, AZ',
                        'Boston, MA',
                        'Austin, TX'
                    ]
                }));

                // use stickit to bind param models to inputs
                this.stickit(this.app.params.get('keyword'), {
                    '#keyword': 'value'
                });

                this.stickit(this.app.params.get('location'), {
                    '#location': 'value'
                });

                return this;
            }
        });

    return Module;
});