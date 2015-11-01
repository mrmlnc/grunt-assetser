/*
 * grunt-assetser
 * https://github.com/mrmlnc/grunt-assetser
 *
 * Copyright (c) 2015 Denis Malinochkin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var utils = require('./lib/utils');

  grunt.registerMultiTask('assetser', 'Inserting the contents of external CSS and JavaScript files directly into the HTML document', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var o = this.options({
      assetsDir: '',
      onlyMarked: false,
      onlyType: ''
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
        }).map(function(filePath) {
          var html = utils.preparationHtml(grunt.file.read(filePath));
          var styles = utils.changeCodeIndent(assets.styles, html.indent, html.nesting);
          var scripts = utils.changeCodeIndent(assets.scripts, html.indent, html.nesting);
          return html.head + styles + html.main + scripts + html.footer;
        });

        grunt.file.write(f.dest, src);
        grunt.log.ok('The file ' + f.dest + ' has been successfully created.');
      });

      done();
    });
  });
};
