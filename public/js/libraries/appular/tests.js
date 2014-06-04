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

        it ('should have a components property', function () {
            assert.property(Appular, 'components');
            expect(Appular.components).to.be.an('object');
        });

        it ('should have a config property with an environment', function () {
            assert.property(Appular, 'config');
            expect(Appular.config).to.be.instanceOf(Object);
            assert.property(Appular.config, 'env');
        });

        it ('Can load an appular component', function (done) {

            Backbone.once('appular:component:required', function (component) {
                assert.ok(component);
                expect(component.options.foo).to.equal('bar');
                expect(component).to.have.property('$body');
                done();
            });

            Appular.require.component('_boilerplate', { foo: 'bar' });
        });

        it ('Can load an appular app', function (done) {
            Backbone.once('appular:app:required', function (app) {
                assert.ok(app);
                expect(app).to.be.an.instanceOf(Backbone.App);
                done();
            });

            Appular.require.app('_boilerplate');
        });
    });
});
