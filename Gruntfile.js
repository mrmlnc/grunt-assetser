/*
 * grunt-assetser
 * https://github.com/mrmlnc/grunt-assetser
 *
 * Copyright (c) 2015 Denis Malinochkin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    assetser: {
      default_options: {
        options: {
          assetsDir: 'test/fixtures/assets'
        },
        files: {
          'tmp/default.html': 'test/fixtures/blank_space.html',
          'tmp/default_tab.html': 'test/fixtures/blank_tab.html'
        }
      },
      marked_default: {
        options: {
          onlyMarked: true,
          assetsDir: 'test/fixtures/assets'
        },
        files: {
          'tmp/marked_default.html': 'test/fixtures/blank_space.html'
        }
      },
      marked_mark: {
        options: {
          onlyMarked: 'mark',
          assetsDir: 'test/fixtures/assets'
        },
        files: {
          'tmp/marked_mark.html': 'test/fixtures/blank_space.html'
        }
      },
      only_js: {
        options: {
          onlyType: 'js',
          assetsDir: 'test/fixtures/assets'
        },
        files: {
          'tmp/type_js.html': 'test/fixtures/blank_space.html'
        }
      },
      only_css: {
        options: {
          onlyType: 'css',
          assetsDir: 'test/fixtures/assets'
        },
        files: {
          'tmp/type_css.html': 'test/fixtures/blank_space.html'
        }
      },
      only_css_and_marked_mark: {
        options: {
          onlyMarked: 'mark',
          onlyType: 'css',
          assetsDir: 'test/fixtures/assets'
        },
        files: {
          'tmp/type_css_and_marked_mark.html': 'test/fixtures/blank_space.html'
        }
      },
      multiple_assets: {
        options: {
          assetsDir: ['test/fixtures/assets', 'test/fixtures/more-assets']
        },
        files: {
          'tmp/multiple_assets.html': 'test/fixtures/blank_space.html'
        }
      },
      nesting: {
        options: {
          assetsDir: ['test/fixtures/assets', 'test/fixtures/more-assets']
        },
        files: {
          'tmp/nesting_space.html': 'test/fixtures/blank_space_nesting.html',
          'tmp/nesting_tab.html': 'test/fixtures/blank_tab_nesting.html'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'assetser', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
