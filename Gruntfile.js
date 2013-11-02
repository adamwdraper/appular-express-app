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
            prod: {
                options: {
                    node_env: 'production'
                }
            }
        }
    });

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
        'develop'
    ]);
    
    grunt.registerTask('develop', 'Builds starts server in development environment, and watches NODE.js files for changes.', [
        'express:development',
        'watch'
    ]);
    
    grunt.registerTask('production', 'Builds starts server in development environment, and watches NODE.js files for changes.', [
        'espress:production',
        'watch'
    ]);
};