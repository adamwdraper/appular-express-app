define([
    'jquery',
    'underscore',
    'backbone',
    './component'
], function ($, _, Backbone, Component) {
    var component;

    describe('Recommended Venues Component', function () {
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
