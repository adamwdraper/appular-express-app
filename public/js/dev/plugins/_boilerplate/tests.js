define([
    'jquery',
    'underscore',
    'backbone',
    './plugin'
], function ($, _, Backbone, Plugin) {
    var plugin = new Plugin();

    describe('Boilerplate Plugin', function () {
        describe('Plugin', function () {
            it('Exhists', function () {
                assert.ok(plugin);
            });
        });
    });
});