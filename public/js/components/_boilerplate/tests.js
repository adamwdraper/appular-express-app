define([
    'jquery',
    'underscore',
    'backbone',
    './component'
], function ($, _, Backbone, Component) {
    var component;

    describe('Boilerplate Component', function () {
        describe('Component', function () {
            beforeEach(function (done) {
                component = new Component();
                done();
            });

            it('Exists', function () {
                assert.ok(component);
            });

            it ('Should have view content after calling render', function () {
                expect(component.$el.html()).to.be.empty;
                component.render();
                expect(component.$el.html()).to.match(/This is a module/);
            });
        });
    });
});
