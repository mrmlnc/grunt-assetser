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
    o.onlyMarked = utils.getMarker();

    // Get list of files from assets directory
    var assets = utils.getAssetFiles();
    assets = utils.combineAssets(assets);

    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        /* eslint no-else-return: 0 */
        if (grunt.file.exists(filepath)) {
          return true;
        } else {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
      }).map(function(filepath) {
        var htmlRaw = grunt.file.read(filepath);
        var html = utils.preparationHtml(htmlRaw);
        var styles = utils.changeCodeIndent(assets.styles, html.indent, html.nesting);
        var scripts = utils.changeCodeIndent(assets.scripts, html.indent, html.nesting);

        return html.head + styles + html.main + scripts + html.footer;
      });

      grunt.file.write(f.dest, src);
      grunt.log.ok('The file ' + f.dest + ' has been successfully created.');
    });
  });
};
