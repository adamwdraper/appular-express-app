define([
    'domReady!',
    'jquery',
    'underscore',
    'backbone'
], function (doc, $, _, Backbone) {
    window.expect = chai.expect;
    window.assert = chai.assert;

    mocha.setup('bdd');

    require([
        'libraries/appular/tests/test'
    ], function () {
        mocha.run();
    });
    
});