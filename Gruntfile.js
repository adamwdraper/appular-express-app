var fs = require('fs');

module.exports = function(grunt) {
    var appular = {
            paths: {
                routers: './public/js/routers',
                components: './public/js/components',
                plugins: './public/js/plugins',
                utilities: './public/js/utilities'
            },
            routers: [],
            components: [],
            plugins: [],
            utilities: []
        };

    // add appular router definition for build
    fs.readdirSync(appular.paths.routers).forEach(function (name) {
        if (name[0] !== '.' && name[0] !== '_') {
            appular.routers.push({
                name: 'routers/' + name + '/router',
                exclude: [
                    'libraries/require/require'
                ]
            });
        }
    });

    // add appular component definition for build and test files
    fs.readdirSync(appular.paths.components).forEach(function (name) {
        if (name[0] !== '.' && name[0] !== '_') {
            appular.components.push({
                name: 'components/' + name + '/component',
                exclude: [
                    'libraries/require/require'
                ]
            });
        }
    });

    // add appular plugins definition for build files
    fs.readdirSync(appular.paths.plugins).forEach(function (name) {
        if (name[0] !== '.' && name[0] !== '_') {
            appular.plugins.push('plugins/' + name + '/plugin');
        }
    });

    // add appular utilities definition for build files
    fs.readdirSync(appular.paths.utilities).forEach(function (name) {
        if (name[0] !== '.' && name[0] !== '_') {
            appular.plugins.push('utilities/' + name + '/utility');
        }
    });

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        open : {
            server : {
                path: 'http://localhost:5000'
            }
        },
        watch: {
            express: {
                files:  [
                    'app.js'
                ],
                tasks:  [
                    'express:development'
                ],
                options: {
                    nospawn: true //Without this option specified express won't be reloaded
                }
            },
            sass: {
                files: 'public/scss/**/*.scss',
                tasks: [
                    'sass:dev'
                ]
            },
            testFiles: {
                files: ['**/tests.js'],
                tasks: ['test']
            }
        },
        express: {
            options: {
                script: 'app.js',
                port: 5000
            },
            development: {
                options: {
                    node_env: 'development'
                }
            },
            production: {
                options: {
                    node_env: 'production'
                }
            }
        },
        jshint: {
            all: [
                'public/js/routers/**/*.js',
                'public/js/components/**/*.js',
                'public/js/plugins/**/*.js',
                'public/js/utilities/**/*.js'
            ],
            options: {
                node: true,
                browser: true,
                curly: true,
                devel: true,
                eqeqeq: true,
                noarg: true,
                sub: true,
                expr: true,
                es5: true,
                globals: {
                    define: false,
                    describe: false,
                    it: false,
                    assert: false,
                    expect: false,
                    require: false,
                    requirejs: false
                },
                strict: false
            }
        },
        karma: {
            unit: {
                configFile: 'public/js/karma.conf.js'
            },
            ci: {
                configFile: 'public/js/karma.conf.js',
                singleRun: true,
                autoWatch: false
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'public/js',
                    dir: 'public/js/build',
                    paths: {
                        'appular': 'libraries/appular/appular',
                        'modernizr': 'libraries/modernizr/modernizr',
                        'jquery': 'empty:',
                        'jqueryFunctions': 'libraries/jquery/extensions/functions',
                        'underscore': 'libraries/underscore/underscore',
                        'backbone': 'libraries/backbone/backbone',
                        'backboneStickit': 'libraries/backbone/extensions/stickit',
                        'moment': 'empty:',
                        'numeral': 'empty:',
                        'domReady': 'libraries/require/plugins/domReady',
                        'async': 'libraries/require/plugins/async',
                        'json': 'libraries/require/plugins/json',
                        'template': 'libraries/require/plugins/template',
                        'text': 'libraries/require/plugins/text'
                    },
                    shim: {
                        'modernizr': {
                            exports: 'Modernizr'
                        }
                    },
                    modules: [
                        {
                            name: 'libraries/require/require',
                            include: [
                                'modernizr',
                                'libraries/require/require',
                                'libraries/require/configs/build',
                                'underscore',
                                'backbone',
                                'appular',
                                'jqueryFunctions',
                                'backboneStickit',
                                'domReady',
                                'text'
                            ].concat(appular.plugins, appular.utilities)
                        }
                    ].concat(appular.routers, appular.components),
                    removeCombined: true
                }
            }
        },
        sass: {
            dev: {
                options: {
                    noCache: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'public/scss/stylesheets/',
                        src: [
                            '*.scss'
                        ],
                        dest: 'public/css/',
                        ext: '.css'
                    }
                ]
            },
            build: {
                options: {
                    style: 'compressed',
                    noCache: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'public/scss/stylesheets/',
                        src: [
                            '*.scss'
                        ],
                        dest: 'public/css/',
                        ext: '.css'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'develop'
    ]);

    grunt.registerTask('develop', 'Starts server in development environment, and watches NODE.js and SASS files for changes.', [
        'sass:dev',
        'express:development',
        'watch'
    ]);

    grunt.registerTask('test', 'Runs tests', [
        'jshint',
        'karma:ci'
    ]);

    grunt.registerTask('production', 'Starts server in production environment.', [
        'express:production',
        'watch'
    ]);

    grunt.registerTask('build', 'Hints and builds production JS, builds JS documentation, builds production CSS', [
        'requirejs',
        'sass:build'
    ]);
};
