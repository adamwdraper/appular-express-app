define([
    'jquery',
    'underscore',
    'backbone',
    './app'
], function ($, _, Backbone, App) {
    var app = new App();

    describe('Default App', function () {
        describe('App', function () {
            it('Exists', function () {
                assert.ok(app);
            });
        });
    });
});
