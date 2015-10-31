/*
 * grunt-assetser
 * https://github.com/mrmlnc/grunt-assetser
 *
 * Copyright (c) 2015 Denis Malinochkin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var Utils = require('./lib/utils');

  grunt.registerMultiTask('assetser', 'Insert specific .js .css files in HTML files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var o = this.options({
      assetsDir: '',
      onlyMarked: false,
      onlyType: ''
    });

    var utils = new Utils(o);

    // Preparation marker for files
    o.onlyMarked = (o.onlyMarked === true) ? '._inline' : o.onlyMarked;

    // Get list of files from assets directory
    var assets = utils.combineAssets(utils.getAssetFiles());

    this.files.forEach(function(f) {
      var src = f.src.filter(function(filePath) {
        /* eslint no-else-return: 0 */
        if (grunt.file.exists(filePath)) {
          return true;
        } else {
          grunt.log.warn('Source file "' + filePath + '" not found.');
          return false;
        }
      }).map(function(filepath) {
        var html = utils.preparationHtml(grunt.file.read(filepath));
        var styles = utils.changeCodeIndent(assets.styles, html.indent, html.nesting);
        var scripts = utils.changeCodeIndent(assets.scripts, html.indent, html.nesting);

        return html.head + styles + html.main + scripts + html.footer;
      });

      grunt.file.write(f.dest, src);
      grunt.log.ok('The file ' + f.dest + ' has been successfully created.');
    });
  });
};
