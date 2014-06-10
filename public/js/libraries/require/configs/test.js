/*
 * Dev Config Settings
 */
requirejs.config({
    waitSeconds: 0,
    baseUrl: '/js',
    config: {
        'appular': {
            env: 'develop',
            useFixtures: true
        }
    },
    paths: {
        'appular': 'libraries/appular/appular',
        'modernizr': 'libraries/modernizr/modernizr',
        'jquery': 'libraries/jquery/jquery',
        'jqueryFunctions': 'libraries/jquery/extensions/functions',
        'underscore': 'libraries/underscore/underscore',
        'backbone': 'libraries/backbone/backbone',
        'moment': 'libraries/moment/moment',
        'numeral': 'libraries/numeral/numeral',
        'domReady': 'libraries/require/plugins/domReady',
        'async': 'libraries/require/plugins/async',
        'json': 'libraries/require/plugins/json',
        'template': 'libraries/require/plugins/template',
        'text': 'libraries/require/plugins/text'
    },
    deps: [
        'modernizr',
        'jqueryFunctions',
        'appular'
    ],
    callback: function () {
        require([
            'tests'
        ]);
    }
});