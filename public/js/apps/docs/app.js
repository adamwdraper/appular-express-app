/**
 * @appular docs
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var App = Backbone.App.extend({
            params: {
                'view': {
                    value: 'libraries',
                    alias: 'v'
                }
            },
            initialize: function () {},
            render: function () {
                Backbone.trigger('appular:app:rendered');

                return this;
            }
        });

    return App;
});