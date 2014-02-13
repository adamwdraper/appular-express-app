define([
    'jquery',
    'underscore',
    'backbone',
    'appular',
    './app'
], function ($, _, Backbone, Appular, App) {
    var app = new App();

    describe('Default App', function () {
        describe('App', function () {
            it('Exists', function () {
                assert.ok(app);
            });
        });
    });
});
