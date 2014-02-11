define([
    'jquery',
    'underscore',
    'backbone',
    './app'
], function ($, _, Backbone, App) {
    var app = new App();

    describe('Default App', function () {
        describe('App', function () {
            it('Exhists', function () {
                assert.ok(app);
            });
        });
    });
});