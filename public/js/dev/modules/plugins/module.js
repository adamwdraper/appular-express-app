/**
 * @appular boilerplate
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'plugins/multi-select/plugin'
], function ($, _, Backbone, MultiSelect) {
    var Module = Backbone.Module.extend({
            events: {},
            initialize: function() {
                this.plugins.multiSelect = new MultiSelect({
                    el: '#multi-select'
                });
            },
            render: function() {
                this.plugins.multiSelect.render();

                return this;
            }
        });

    return Module;
});