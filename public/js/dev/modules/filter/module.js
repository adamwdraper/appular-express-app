/**
 * @appular filter
 */

 define([
    'jquery',
    'underscore',
    'backbone',
    'text!./templates/module.html',
    'plugins/select/plugin'
], function ($, _, Backbone, template, Select) {
    var Module = Backbone.Module.extend({
            events: {
                'keyup #keyword': 'keywordChanged'
            },
            initialize: function() {
                _.bindAll(this, 'setLocation');
            },
            render: function() {
                this.$el.html(_.template(template, {
                    value: this.app.params.getValue('keyword')
                }));

                this.plugins.select = new Select({
                    el: '#location',
                    options: [
                        'San Francisco, CA',
                        'Phoenix, AZ',
                        'Boston, MA',
                        'Austin, TX'
                    ],
                    value: this.app.params.getValue('location')
                }).render();
                this.listenTo(this.plugins.select, 'change:value', this.setLocation);

                this.$keyword = $('#keyword');

                return this;
            },
            keywordChanged: _.debounce(function () {
                if (this.$keyword.val()) {
                    this.app.params.setValue('keyword', this.$keyword.val());
                }
            }, 500),
            setLocation: function (option, value) {
                this.app.params.setValue('location', value);
            }
        });

    return Module;
});