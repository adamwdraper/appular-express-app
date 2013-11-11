define([
    'jquery',
    'underscore',
    'backbone',
    'json!modules/docs/json/docs.json',
    'text!modules/docs/templates/docs.html',
    'text!modules/docs/templates/doc.html',
    'text!modules/docs/templates/function.html',
    'text!modules/docs/templates/event.html'
], function ($, _, Backbone, docs, template, docTemplate, functionTemplate, eventTemplate) {
    var view = Backbone.View.extend({
            params: {
                filter: {
                    default: '',
                    alias: '',
                    addToHistory: true,
                    addToUrl: true,
                    loadFromCookie: false,
                    isArray: false,
                    onChange: function () {
                        console.log('filter changed');
                    }
                }
            },
            events: {},
            initialize: function() {
                
            },
            render: function() {
                this.$el.html(_.template(template, {
                    docs: docs,
                    templates: {
                        doc: docTemplate,
                        e: eventTemplate,
                        func: functionTemplate
                    },
                    jsRepoUrl: 'https://github.com/adamwdraper/appular-express-app/blob/master/public'
                }));

                return this;
            }
        });

    return view;
});