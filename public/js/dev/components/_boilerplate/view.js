/**
 * @appular boilerplate
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!./templates/module.html'
], function ($, _, Backbone, template) {
    var View = Backbone.View.extend({
            template: _.template(template),
            events: {},
            initialize: function () {},
            render: function () {
                this.$el.html(this.template());

                return this;
            }
        });

    return View;
});