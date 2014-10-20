'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/*.js',
        dest: 'build/main.min.js'
      }
    },
    sass: {
      dist: {
        files: {
         'build/main.css':'sass/main.scss'
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }
  });

  // Load the plugin that generates css from sass.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the gh-pages tasks
  grunt.loadNpmTasks('grunt-gh-pages');
  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass', 'gh-pages']);
  grunt.registerTask('deploy', ['gh-pages']);
};