define([
    'jquery',
    'underscore',
    'backbone',
    'json!modules/docs/json/docs.json',
    'text!modules/docs/templates/nav.html'
], function ($, _, Backbone, docs, template) {
    var view = Backbone.View.extend({
            events: {
                'click [data-link]': 'updateDocType'
            },
            initialize: function () {
                _.bindAll(this, 'updateDocType');
            },
            render: function () {
                this.$el.html(_.template(template, {
                    docs: docs
                }));

                return this;
            },
            updateDocType: function (event) {
                console.log($(event.currentTarget).data('link'));
                
                event.preventDefault();
            }
        });
    
    return view;
});