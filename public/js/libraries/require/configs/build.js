/*
 * Prod Config Settings
 */
requirejs.config({
    waitSeconds: 30,
    baseUrl: '/js/build',
    paths: {
        'jquery': [
            '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
            'libraries/jquery/jquery'
        ],
        'moment': [
            '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min',
            'libraries/moment/moment'
        ],
        'numeral': [
            '//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.5.2/numeral.min',
            'libraries/numeral/numeral'
        ]
    },
    deps: [
        'modernizr',
        'jqueryFunctions',
        'backboneStickit'
    ],
    callback: function () {
        require([
            'initialize'
        ]);
    }
});