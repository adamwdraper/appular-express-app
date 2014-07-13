// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: [
        'mocha',
        'requirejs',
        'chai',
        'sinon'
    ],
    files: [
        'libraries/require/configs/karma.js',
        {
            pattern: 'apps/**/*',
            included: false
        },
        {
            pattern: 'libraries/**/*',
            included: false
        },
        {
            pattern: 'components/**/*',
            included: false
        },
        {
            pattern: 'plugins/**/*',
            included: false
        },
        {
            pattern: 'utilities/**/*',
            included: false
        }
    ],
    reporters: [
        'mocha'
    ],
    browsers: [
        'Chrome',
        'Firefox'
    ]
  });
};