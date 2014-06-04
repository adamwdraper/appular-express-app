define([
    'jquery',
    'underscore',
    'backbone',
    './plugin'
], function ($, _, Backbone, Pagination) {

    describe('Pagination plugin', function () {
        var Subject,
            Defaults;

        beforeEach(function (done) {
            Subject = new Pagination({
                total: 30,
                count: 5
            }).render();
            Defaults = new Pagination();
            done();
        });

        it ('should set default options when custom options are not passed', function () {
            expect(Defaults.model.get('count')).to.eql(1);
        });

        it ('should have a custom page count', function () {
            expect(Subject.model.get('count')).to.equal(5);
        });

        it ('should have a model instance after construction', function () {
            expect(Defaults.model).to.be.an.instanceOf(Backbone.Model);
        });
    });

});
