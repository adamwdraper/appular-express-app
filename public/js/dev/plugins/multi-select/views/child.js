/**
 * @appular boilerplate
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/child.html'
], function ($, _, Backbone, template) {
    var View = Backbone.View.extend({
            template: _.template(template),
            bindings: {
                'input': 'isSelected'
            },
            events: {},
            initialize: function () {},
            render: function () {
                this.$el.html(this.template({
                    select: this.model
                }));

                this.stickit();
                
                return this;
            }
        });

    return View;
});