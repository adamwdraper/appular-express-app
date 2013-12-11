define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/nav.html'
], function ($, _, Backbone, template) {
    var view = Backbone.View.extend({
            events: {
                'click [data-link]': 'updateDocType'
            },
            initialize: function () {
                _.bindAll(this, 'updateDocType');
            },
            render: function () {
                this.$el.html(_.template(template, {
                    docs: this.options.docs
                }));

                return this;
            },
            updateDocType: function (event) {
                this.module.app.params.setValue('view', $(event.currentTarget).data('link'));
                
                event.preventDefault();
            }
        });
    
    return view;
});