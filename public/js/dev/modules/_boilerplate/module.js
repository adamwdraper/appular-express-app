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
            template: _.template(template),
            events: {},
            initialize: function () {},
            render: function () {
                this.$el.html(this.template());

                return this;
            }
        });

    return Module;
});