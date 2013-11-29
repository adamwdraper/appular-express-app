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
            events: {},
            initialize: function() {
                _.bindAll(this, 'setLocation');
            },
            render: function() {
                this.$el.html(_.template(template, {}));

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

                // use stickit to bind param models to inputs
                // this.stickit(this.app.params.get('keyword'), {
                //     '#keyword': 'value'
                // });

                return this;
            },
            setLocation: function (option, value) {
                this.app.params.setValue('location', value);
            }
        });

    return Module;
});