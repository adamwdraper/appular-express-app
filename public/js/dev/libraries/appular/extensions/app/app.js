/**
 * @appular app
 */
define([
    'backbone'
], function (Backbone) {
    Backbone.App = Backbone.View.extend({
        params: {},
        router: {},
        /**
        @function get - shortcut to get params's value
        */
        get: function(name) {
            return this.params.getValue(name);
        },
        /**
        @function set - shortcut to set param's value
        */
        set: function(id, value, options) {
            return this.params.setValue(id, value, options);
        }
    });
});