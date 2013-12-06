/**
 * @appular pagination
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!./templates/plugin.html'
], function($, _, Backbone, template) {
    var Plugin = Backbone.Plugin.extend({
            template: _.template(template),
            events: {
                'click [data-page]': 'updatePage'
            },
            options: {
                page: 1,
                total: 1,
                count: 1,
                items: 7,
                scrollTopSelector: 'html, body'
            },
            initialize: function() {
                _.bindAll(this, 'updatePage');
                
                this.on('change:page change:total', this.renderHtml);
            },
            render: function () {
                return this;
            },
            renderHtml: function () {
                var pages = [],
                    lastPage = Math.ceil(this.get('total')/this.get('count')),
                    magicNumber = Math.floor(this.get('items') / 2),
                    page,
                    i = 0;

                if (this.get('page') - magicNumber < 1) {
                    page = 1;
                } else if (this.get('page') + magicNumber > lastPage) {
                    page = lastPage - this.get('items') + 1;
                } else {
                    page = this.get('page') - magicNumber;
                }

                for (i; i < this.get('items'); i++) {
                    if (page >= 1 && page <= lastPage) {
                        pages.push({
                            page: page,
                            current: (page === this.get('page')) ? true : false
                        });
                    }
                    page++;
                }

                this.$el.html(this.template({
                    page: this.get('page'),
                    pages: pages,
                    previousPage: this.get('page') - 1 || 1,
                    nextPage: this.get('page') + 1,
                    lastPage: lastPage
                }));
            },
            updatePage: function (e) {
                this.set('page', $(e.currentTarget).data('page'));

                if (this.get('scrollTopSelector')) {
                    $('html, body').animate({
                        scrollTop: $(this.get('scrollTopSelector')).offset().top
                    }, 'fast');
                }
            }
        });
    
    return Plugin;
});