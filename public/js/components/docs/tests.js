define([
    'jquery',
    'underscore',
    'backbone',
    '../../apps/_boilerplate/app',
    './component'
], function ($, _, Backbone, App, Component) {
    var component;

    describe('Docs Component', function () {
        describe('Construction', function () {
            beforeEach(function (done) {
                component = new Component({
                    app: new App()
                });
                done();
            });

            it('Exists', function () {
                assert.ok(component);
            });
        });
    });
});
