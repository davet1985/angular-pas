'use strict';

module.exports = function(grunt) {

    var path = require('path');

    grunt.initConfig({

        env: process.env.NODE_ENV,

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    //angular
                    'app/bower_components/jquery/dist/jquery.min.js',
                    'app/bower_components/angular/angular.js',
                    'app/bower_components/angular-route/angular-route.js',
                    'app/bower_components/angular-resource/angular-resource.js',
                    'app/app.js',
                    'app/controllers/*.js',
                    'app/services/*.js'
                ],
                dest: 'public/js/src.js'
            },
            config_dev: {
                src: [
                    'config/dev.js'
                ],
                dest: 'public/js/config.js'
            },
            config_prod: {
                src: [
                    'config/prod.js'
                ],
                dest: 'public/js/config.js'
            },
            combine: {
                src: [
                    'public/js/src.js',
                    'public/js/config.js'
                ],
                dest: 'public/js/app.js'
            }
        },
        watch: {
            dev: {
                files: [
                    'app/app.js', 
                    'app/controllers/*.js', 
                    'app/services/*.js',
                    'config/<%= env %>.js'
                ],
                tasks: ['default'],
                options: {
                    spawn: true
                }
            }
        }
 
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['concat:dist', 'concat:config_dev', 'concat:combine']);
    grunt.registerTask('heroku:prod', ['concat:dist', 'concat:config_prod', 'concat:combine']);
    
};
