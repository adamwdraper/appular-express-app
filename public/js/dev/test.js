define([
    'domReady!',
    'jquery',
    'underscore',
    'backbone',
    'appular',
    'mocha'
], function (doc, $, _, Backbone, Appular, mocha) {
    mocha.setup('bdd');

    require([
        'libraries/appular/tests/test'
    ], function () {
        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        } else {
            mocha.run();
        }
    });
    
});