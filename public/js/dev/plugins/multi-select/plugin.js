/**
 * @appular boilerplate
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './collections/parents',
    './views/parent',
    './fixtures/parents'
], function ($, _, Backbone, Parents, ParentView, fixtures) {
    var Plugin = Backbone.Plugin.extend({
            events: {},
            initialize: function () {},
            render: function () {
                this.collection = new Parents(fixtures);

                this.collection.each(function (parent) {
                    var view = new ParentView({
                        name: parent.get('name'),
                        children: parent.get('children')
                    }).render();

                    this.$el.append(view.$el);
                }, this);
                
                return this;
            }
        });

    return Plugin;
});