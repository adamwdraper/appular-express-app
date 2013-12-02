/**
 * @appular boilerplate
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!./templates/plugin.html'
], function ($, _, Backbone, template) {
    var Plugin = Backbone.Plugin.extend({
            events: {},
            initialize: function () {},
            render: function () {
                this.$el.html(_.template(template, {}));
                
                return this;
            }
        });

    return Plugin;
});