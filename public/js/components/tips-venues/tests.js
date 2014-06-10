define([
    'jquery',
    'underscore',
    'backbone',
    '../../apps/_boilerplate/app',
    './component'
], function ($, _, Backbone, App, Component) {
    var component,
        app;

    describe('Tips & Venues Component', function () {
        describe('Construction', function () {
            beforeEach(function (done) {
                var App = Backbone.App.extend();

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
