define([
    'domReady!',
    'jquery',
    'underscore',
    'backbone',
    'appular'
], function (doc, $, _, Backbone, Appular) {
    window.expect = chai.expect;
    window.assert = chai.assert;

    mocha.setup('bdd');

    require(testsToRun, function () {
        mocha.run();
    });
});