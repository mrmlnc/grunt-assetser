/*
 * grunt-assetser
 * https://github.com/mrmlnc/grunt-assetser
 */

'use strict';

module.exports = function(grunt) {
  var utils = require('../lib/utils');

  grunt.registerMultiTask('assetser', 'Inserting the contents of external CSS and JavaScript files directly into the HTML document', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var o = this.options({
      assetsDir: '',
      onlyMarked: false,
      onlyType: '',
      verbose: true
    });

    // Preparation marker for files
    o.onlyMarked = (o.onlyMarked === true) ? '._inline' : o.onlyMarked;

    // Save context
    var files = this.files;
    var done = this.async();

    utils.getAssetsContent(o).then(function(assets) {
      files.forEach(function(f) {
        var src = f.src.filter(function(filePath) {
          /* eslint no-else-return: 0 */
          if (grunt.file.exists(filePath)) {
            return true;
          } else {
            grunt.log.warn('Source file "' + filePath + '" not found.');
            return false;
          }
        }).map(function (filePath) {
          var htmlRaw = grunt.file.read(filePath);
          return utils.preparationHtml(htmlRaw, assets);
        });

        grunt.file.write(f.dest, src);

        if (o.verbose) {
          grunt.log.ok('The file ' + f.dest + ' has been successfully created.');
        }
      });

      done();
    });
  });
};
