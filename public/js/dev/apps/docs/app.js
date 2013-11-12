/**
 * @appular docs
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var App = Backbone.App.extend({
            initialize: function () {
                this.params.add([
                    {
                        id: 'filter',
                        value: '',
                        alias: '',
                        addToHistory: true,
                        addToUrl: true,
                        loadFromCookie: false,
                        isArray: false
                    }
                ]);

                this.listenTo(this.params, 'initialized', function () {
                    Backbone.trigger('app:initialized');
                });
            },
            render: function () {
                this.params.load();

                return this;
            }
        });

    return App;
});