define([
    'jquery',
    'underscore',
    'backbone',
    'appular',
    './app'
], function ($, _, Backbone, Appular, App) {
    var app = new App();

    describe('Default App', function () {
        describe('App', function () {
            it('Exists', function () {
                assert.ok(app);
            });

            it ('It can load an appular component', function (done) {

                Backbone.on('appular:component:required', function (component) {
                    assert.ok(component);
                    expect(component.get('foo')).to.equal('bar');
                    expect(Appular.components).to.have.property('docs');
                    done();
                });

                Appular.require.component('docs', { foo: 'bar' });
            });
        });
    });
});
