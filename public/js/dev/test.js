define([
    'domReady!',
    'jquery',
    'underscore',
    'backbone',
    'appular',
    'mocha',
    'chai',
    'modernizr',
    'jqueryFunctions',
    'backboneStickit'
], function (doc, $, _, Backbone, Appular, mocha, chai) {
    mocha.setup('bdd');

    var assert = chai.assert;
    
    describe('Array', function() {
        describe('#indexOf()', function() {
            it('should return -1 when the value is not present', function(){
              assert.equal(-1, [1,2,3].indexOf(5));
              assert.equal(-1, [1,2,3].indexOf(0));
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }
});
