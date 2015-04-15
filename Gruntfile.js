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
                    'app/services/*.js',
                    'config/<%= env %>.js',
                    'config/prod.js'
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
    
    grunt.registerTask('default', ['concat']);
    grunt.registerTask('heroku:prod', ['concat']);
    
};
