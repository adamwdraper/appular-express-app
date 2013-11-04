module.exports = function(grunt) {

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
        docs: {
            build: {
                options: {
                    pretty: true
                },
                files: {
                    'public/js/dev/modules/docs/json/docs.json': [
                        'public/js/dev/**/*.js'
                    ]
                }
            }
        },
        jshint: {
            all: [
                'public/js/dev/modules/**/*.js',
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
                        'modernizr': 'libraries/modernizr/modernizr-2.6.3',
                        'jquery': 'empty:',
                        'jqueryFunctions': 'libraries/jquery/extensions/functions',
                        'underscore': 'libraries/underscore/underscore-1.5.0',
                        'backbone': 'libraries/backbone/backbone-1.0.0',
                        'moment': 'empty:',
                        'numeral': 'empty:',
                        'domReady': 'libraries/require/plugins/domReady',
                        'async': 'libraries/require/plugins/async',
                        'json': 'libraries/require/plugins/json',
                        'text': 'libraries/require/plugins/text'
                    },
                    modules: [
                        {
                            name: 'appular',
                            include: [
                                'modernizr',
                                'libraries/require/require-2.1.9',
                                'libraries/require/config-build',
                                'libraries/appular/appular',
                                'jquery',
                                'jqueryFunctions',
                                'underscore',
                                'backbone',
                                'domReady',
                                'text'
                            ]
                        },
                        {
                            name: 'modules/demo/module',
                            exclude: [
                                'appular'
                            ]
                        },
                        {
                            name: 'modules/user-bar/module',
                            exclude: [
                                'appular'
                            ]
                        },
                        {
                            name: 'modules/docs/module',
                            exclude: [
                                'appular'
                            ]
                        }
                    ],
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

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
        'develop'
    ]);
    
    grunt.registerTask('develop', 'Builds starts server in development environment, and watches NODE.js and SASS files for changes.', [
        'express:development',
        'watch'
    ]);
    
    grunt.registerTask('production', 'Builds starts server in development environment, and watches NODE.js files for changes.', [
        'build',
        'express:production',
        'watch'
    ]);

    grunt.registerTask('build', 'Builds hints and builds production JS, builds JS documentation json, builds production CSS', [
        'jshint',
        'docs:build',
        'requirejs',
        'sass:build'
    ]);
};