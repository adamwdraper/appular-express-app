/**
 * @appular test
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
                this.listenTo(this.app.params, 'change', this.render);
            },
            render: function() {
                this.$el.html(_.template(template, {
                    params: this.app.params
                }));

                return this;
            }
        });

    return Module;
});