define([
    'jquery',
    'underscore',
    'backbone',
    'appular',
    'mocha',
    'chai'
], function ($, _, Backbone, Appular, mocha, chai) {
    var assert = chai.assert;
    
    describe('Appular', function () {
        it('should have certain properties', function () {
            assert.property(Appular, 'version');
        });
    });
});