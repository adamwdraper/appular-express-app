define([
    'jquery',
    'underscore',
    'backbone',
    'appular'
], function ($, _, Backbone, Appular) {
    describe('Appular', function () {
        it('should have certain properties', function () {
            assert.property(Appular, 'version');
        });

        it ('It can load an appular component', function (done) {

            Backbone.on('appular:component:required', function (component) {
                assert.ok(component);
                done();
            });

            Appular.require.component('_boilerplate', { foo: 'bar' });
        });
    });
});
