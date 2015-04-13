'use strict';

module.exports = function(grunt) {

    var path = require('path');

    grunt.initConfig({

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
                    'app/home/*.js', 
                    'app/patient/*.js', 
                    'app/services/*.js',
                ],
                dest: 'public/js/app.js'
            }
        },
        watch: {
            dev: {
                files: [
                    'app/app.js', 
                    'app/home/*.js', 
                    'app/patient/*.js', 
                    'app/services/*.js',
                ],
                tasks: ['prod'],
                options: {
                    spawn: true
                }
            }
        }
 
    });

    // grunt.loadNpmTasks('grunt-contrib-compass');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['concat']);

    grunt.registerTask(
        'prod',[
            // 'compass:production',
            'concat'
            // 'jshint', 
            // 'uglify',
            // 'copy',
            // 'jasmine'
            ]
    );
    
};
