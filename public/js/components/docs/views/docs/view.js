define([
    'jquery',
    'underscore',
    'backbone',
    'template!./template.html',
    'template!./templates/function.html',
    'template!./templates/event.html',
    'template!./templates/doc.html'
], function ($, _, Backbone, template, funcTemplate, eventTemplate, docTemplate) {
    var View = Backbone.View.extend({
            template: template,
            events: {},
            initialize: function () {},
            render: function () {
                this.$el.html(this.template({
                    type: this.get('view'),
                    docs: this.get('docs')[this.get('view')],
                    templates: {
                        func: funcTemplate,
                        e: eventTemplate,
                        doc: docTemplate
                    },
                    jsRepoUrl: 'https://github.com/adamwdraper/appular-express-app/blob/master/public'
                }));

                return this;
            }
        });

    return View;
});