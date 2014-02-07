/*
 * Dev Config Settings
 */
requirejs.config({
    waitSeconds: 0,
    baseUrl: '/js/dev',
    config: {
        'appular': {
            env: 'develop'
        }
    },
    paths: {
        'appular': 'libraries/appular/appular-3.0.1',
        'modernizr': 'libraries/modernizr/modernizr-2.6.3',
        'jquery': 'libraries/jquery/jquery-2.1.0',
        'jqueryFunctions': 'libraries/jquery/extensions/functions',
        'underscore': 'libraries/underscore/underscore-1.5.2',
        'backbone': 'libraries/backbone/backbone-1.1.0',
        'backboneStickit': 'libraries/backbone/extensions/stickit',
        'mocha': 'libraries/mocha/mocha-1.17.1',
        'chai': 'libraries/chai/chai-1.9.1',
        'chaiJquery': 'libraries/chai/chai-jquery-1.2.1',
        'moment': 'libraries/moment/moment-2.4.0',
        'numeral': 'libraries/numeral/numeral-1.5.2',
        'domReady': 'libraries/require/plugins/domReady',
        'async': 'libraries/require/plugins/async',
        'json': 'libraries/require/plugins/json',
        'template': 'libraries/require/plugins/template',
        'text': 'libraries/require/plugins/text'
    },
    deps: [
        'modernizr',
        'jqueryFunctions',
        'backboneStickit',
        'initialize'
    ]
});