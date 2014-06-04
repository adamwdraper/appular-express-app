define([
    'jquery',
    'underscore',
    'backbone',
    'appular'
], function ($, _, Backbone, Appular) {
    describe('Appular', function () {

        it('Should have certain properties', function () {
            assert.property(Appular, 'version');
        });

        it ('Should have a components property', function () {
            assert.property(Appular, 'components');
            expect(Appular.components).to.be.an('object');
        });

        it ('Should have a config property with an environment', function () {
            assert.property(Appular, 'config');
            expect(Appular.config).to.be.instanceOf(Object);
            assert.property(Appular.config, 'env');
        });

        it ('Can load an appular component', function (done) {
            Backbone.once('appular:component:required', function (component) {
                assert.ok(component);
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

        describe('Appular Backbone Object Extenstions', function () {

            describe('View', function () {
                var view;

                beforeEach(function (done) {
                    view = new Backbone.View({
                        app: 'app',
                        test: 'test',
                        model: new Backbone.Model()
                    });
                    done();
                });

                it ('Should have certain properties', function () {
                    assert.property(view, 'config');
                    assert.property(view, 'plugins');
                    assert.property(view, 'views');
                });

                it ('sets model attributes when options are passed to it', function () {
                    expect(view.model.get('test')).to.equal('test');
                });

                it ('creates an app property', function () {
                    expect(view.app).to.equal('app');
                });
            });

            describe('App', function () {
                var app;

                beforeEach(function (done) {
                    app = new Backbone.App();
                    done();
                });

                it ('Should have certain properties', function () {
                    assert.property(app, 'config');
                });
            });

            describe('Collection', function () {
                var collection;

                beforeEach(function (done) {
                    collection = new Backbone.Collection();
                    done();
                });

                it ('Should have certain properties', function () {
                    assert.property(collection, 'config');
                });
            });

            describe('Model', function () {
                var model;

                beforeEach(function (done) {
                    model = new Backbone.Model();
                    done();
                });

                it ('Should have certain properties', function () {
                    assert.property(model, 'config');
                });
            });
        });
    });
});
