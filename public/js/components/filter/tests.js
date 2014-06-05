define([
    'jquery',
    'underscore',
    'backbone',
    './component'
], function ($, _, Backbone, Component) {
    var component;

    describe('Filter Component', function () {
        describe('Construction', function () {
            beforeEach(function (done) {
                component = new Component();
                done();
            });

            it('Exists', function () {
                assert.ok(component);
            });
        });
    });
});
