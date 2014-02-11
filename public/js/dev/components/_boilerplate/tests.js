define([
    'jquery',
    'underscore',
    'backbone',
    './component'
], function ($, _, Backbone, Component) {
    var component = new Component();

    describe('Boilerplate Component', function () {
        describe('Component', function () {
            it('Exhists', function () {
                assert.ok(component);
            });
        });
    });
});