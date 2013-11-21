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
            initialize: function() {
                
            },
            render: function() {
                this.$el.html(_.template(template, {}));
                return this;
            }
        });

    return Module;
});