/**
 * @appular pagination
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './model',
    'template!./template.html'
], function($, _, Backbone, Model, template) {
    var View = Backbone.View.extend({
            template: template,
            model: new Model(),
            listeners: {
                'model change:page change:total': 'renderHtml'
            },
            events: {
                'click [data-page]': 'updatePage'
            },
            initialize: function() {
                _.bindAll(this, 'updatePage');
            },
            render: function () {
                return this;
            },
            renderHtml: function () {
                var pages = [],
                    lastPage = Math.ceil(this.model.get('total')/this.model.get('count')),
                    magicNumber = Math.floor(this.model.get('items') / 2),
                    page,
                    i = 0;

                if (this.model.get('page') - magicNumber < 1) {
                    page = 1;
                } else if (this.model.get('page') + magicNumber > lastPage) {
                    page = lastPage - this.model.get('items') + 1;
                } else {
                    page = this.model.get('page') - magicNumber;
                }

                for (i; i < this.model.get('items'); i++) {
                    if (page >= 1 && page <= lastPage) {
                        pages.push({
                            page: page,
                            current: (page === this.model.get('page')) ? true : false
                        });
                    }
                    page++;
                }

                this.$el.html(this.template({
                    page: this.model.get('page'),
                    pages: pages,
                    previousPage: this.model.get('page') - 1 || 1,
                    nextPage: this.model.get('page') + 1,
                    lastPage: lastPage
                }));
            },
            updatePage: function (e) {
                this.model.set('page', $(e.currentTarget).data('page'));

                if (this.model.get('scrollTopSelector')) {
                    $('html, body').animate({
                        scrollTop: $(this.model.get('scrollTopSelector')).offset().top
                    }, 'fast');
                }
            }
        });

    return View;
});
