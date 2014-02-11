define([
    'jquery',
    'underscore',
    'backbone',
    './app'
], function ($, _, Backbone, App) {
    var app = new App();

    describe('Boilerplate App', function () {
        describe('App', function () {
            it('Exhists', function () {
                assert.ok(app);
            });
        });
    });
});