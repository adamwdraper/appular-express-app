/**
 * @appular module
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    Backbone.Module = Backbone.View.extend({
        plugins: {},
        views: {},
        extendWithApp: function (views) {
            var _this = this;

            _.each(arguments, function (View) {
                _.extend(View.prototype, {
                    app: _this.app
                });
            });
        }
    });
});