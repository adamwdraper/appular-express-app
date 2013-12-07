/**
 * @appular boilerplate
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './child',
    'text!../templates/parent.html'
], function ($, _, Backbone, Child, template) {
    var View = Backbone.View.extend({
            template: _.template(template),
            events: {},
            initialize: function () {},
            render: function () {
                this.$el.html(this.template({
                    name: this.options.name
                }));

                this.$count = this.$el.find('[data-count]');
                this.$children = this.$el.find('[data-children]');

                this.collection = new Backbone.Collection(this.options.children);
                this.listenTo(this.collection, 'change', this.renderSelectedCount);

                this.addChildren();
                
                return this;
            },
            addChildren: function () {
                this.collection.each(function (child) {
                    var view = new Child({
                        model: child
                    }).render();

                    this.$children.append(view.$el);
                }, this);

                this.renderSelectedCount();
            },
            renderSelectedCount: function () {
                var total = this.collection.length,
                    selected = this.collection.where({
                        isSelected: true
                    }).length;

                this.$count.html(selected + ' / ' + total);
            }
        });

    return View;
});