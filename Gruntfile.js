/*
 * grunt-assetser
 * https://github.com/mrmlnc/grunt-assetser
 */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
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
      },
      secondRun: {
        options: {
          assetsDir: ['test/fixtures/assets1', 'test/fixtures/more-assets']
        },
        files: {
          'tmp/second_run.html': 'tmp/multiple_assets.html'
        }
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['assetser']);
};
