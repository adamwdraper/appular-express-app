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
    });
});