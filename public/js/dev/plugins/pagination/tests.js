define([
    'jquery',
    'underscore',
    'backbone',
    './plugin'
], function ($, _, Backbone, Pagination) {

    describe('Pagination plugin', function () {
        var Subject, Defaults;

        beforeEach(function (done) {
            Subject = new Pagination({
                total: 30,
                count: 5
            });
            Defaults = new Pagination();
            done();
        });

        it ('should set default options when custom options are not passed', function () {
            expect(Defaults.get('count')).to.eql(1);
            expect(Defaults.get('total')).to.eql(1);
        });

        it ('should have a custom page count', function () {
            expect(Subject.get('count')).to.equal(5);
            expect(Subject.get('total')).to.equal(30);
        });

        it ('should have a model instance after construction', function () {
            expect(Defaults.model).to.be.an.instanceOf(Backbone.Model);
        });
    });

});
