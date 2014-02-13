define([
    'jquery',
    'underscore',
    'backbone',
    'template!./template.html'
], function ($, _, Backbone, template) {
    var view = Backbone.View.extend({
            template: template,
            events: {
                'click [data-link]': 'updateDocType'
            },
            initialize: function () {
                _.bindAll(this, 'updateDocType');
            },
            render: function () {
                this.$el.html(this.template({
                    docs: this.get('docs')
                }));

                return this;
            },
            updateDocType: function (event) {
                this.set('view', $(event.currentTarget).data('link'));
                
                event.preventDefault();
            }
        });
    
    return view;
});