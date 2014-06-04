define([
    'jquery',
    'underscore',
    'backbone',
    './plugin'
], function ($, _, Backbone, Pagination) {

    describe('Pagination plugin', function () {
        var subject,
            defaults;

        beforeEach(function (done) {
            subject = new Pagination({
                total: 30,
                count: 5
            }).render();
            
            defaults = new Pagination();

            done();
        });

        it ('should set default options when custom options are not passed', function () {
            expect(defaults.model.get('count')).to.eql(1);
        });

        it ('should have a custom page count', function () {
            expect(subject.model.get('count')).to.equal(5);
        });

        it ('should have a model instance after construction', function () {
            expect(defaults.model).to.be.an.instanceOf(Backbone.Model);
        });
    });

});
