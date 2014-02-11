var fs = require('fs');

module.exports = function(grunt) {
    var appular = {
            paths: {
                apps: './public/js/dev/apps',
                components: './public/js/dev/components',
                plugins: './public/js/dev/plugins'
            },
            apps: [],
            components: []
        };

    // add appular app definition for build
    fs.readdirSync(appular.paths.apps).forEach(function (name) {
        if (name[0] !== '.' && name[0] !== '_') {
            appular.apps.push({
                name: 'apps/' + name + '/app',
                exclude: [
                    'appular'
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
                    'appular'
                ]
            });
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
        mocha: {
            test: {
                options: {
                    urls: [
                        'http://localhost:5000/test'
                    ],
                    run: false,
                    reporter: 'Spec'
                }
            }
        },
        docs: {
            build: {
                options: {
                    pretty: true
                },
                files: {
                    'public/js/dev/components/docs/json/docs.json': [
                        'public/js/dev/**/*.js'
                    ]
                }
            }
        },
        jshint: {
            all: [
                'public/js/dev/components/**/*.js',
                'public/js/dev/plugins/**/*.js',
                'public/js/dev/utilities/**/*.js'
            ],
            options: {
                node: true,
                browser: true,
                curly: true,
                devel: false,
                eqeqeq: true,
                eqnull: true,
                noarg: true,
                sub: true,
                undef: true,
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
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'public/js/dev',
                    dir: 'public/js/build',
                    paths: {
                        'appular': 'libraries/appular/appular-4.0.0',
                        'modernizr': 'libraries/modernizr/modernizr-2.6.3',
                        'jquery': 'libraries/jquery/jquery-2.1.0',
                        'jqueryFunctions': 'libraries/jquery/extensions/functions',
                        'underscore': 'libraries/underscore/underscore-1.5.2',
                        'backbone': 'libraries/backbone/backbone-1.1.0',
                        'backboneStickit': 'libraries/backbone/extensions/stickit',
                        'moment': 'libraries/moment/moment-2.4.0',
                        'numeral': 'libraries/numeral/numeral-1.5.2',
                        'domReady': 'libraries/require/plugins/domReady',
                        'async': 'libraries/require/plugins/async',
                        'json': 'libraries/require/plugins/json',
                        'template': 'libraries/require/plugins/template',
                        'text': 'libraries/require/plugins/text'
                    },
                    modules: [
                        {
                            name: 'initialize',
                            include: [
                                'modernizr',
                                'libraries/require/require-2.1.10',
                                'libraries/require/configs/build',
                                'appular',
                                'jquery',
                                'jqueryFunctions',
                                'underscore',
                                'backbone',
                                'backboneStickit',
                                'domReady',
                                'text',
                                'initialize'
                            ]
                        }
                    ].concat(appular.apps, appular.components),
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
        'express:development',
        'mocha'
    ]);
    
    grunt.registerTask('production', 'Starts server in production environment.', [
        'express:production',
        'watch'
    ]);

    grunt.registerTask('build', 'Hints and builds production JS, runs tests, builds JS documentation, builds production CSS', [
        'jshint',
        'test',
        'docs:build',
        'requirejs',
        'sass:build'
    ]);
};