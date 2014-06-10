/**
 * @appular table
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './model',
    'template!./template.html',
    './views/head/view',
    './views/body/view'
], function($, _, Backbone, Model, template, Head, Body) {
    var View = Backbone.View.extend({
            template: template,
            model: Model,
            render: function () {
                this.$el.html(this.template());

                this.views.head = new Head({
                    el: this.$el.find('thead'),
                    model: this.model
                }).render();

                this.views.body = new Body({
                    el: this.$el.find('tbody'),
                    model: this.model
                }).render();

                return this;
            }
        });

    return View;
});