/*
 * grunt-assetser
 * https://github.com/mrmlnc/grunt-assetser
 *
 * Copyright (c) 2015 Denis Malinochkin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var helpers = require('./lib/helpers');

  grunt.registerMultiTask('assetser', 'Insert specific .js .css files in HTML files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var o = this.options({
      assetsDir: '',
      onlyMarked: false,
      onlyType: ''
    });

    // Preparation marker for files
    o.onlyMarked = helpers.getMarker(o.onlyMarked);

    // Get list of files from assets directory
    var assets = helpers.getAssetFiles(o.assetsDir, o.onlyMarked, o.onlyType);
    assets = helpers.compileAssets(assets);

    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var htmlRaw = grunt.file.read(filepath);
        var html = helpers.preparationHtml(htmlRaw);
        var styles = helpers.changeIndent(assets.styles, html.indent);
        var scripts = helpers.changeIndent(assets.scripts, html.indent);

        return html.head + styles + html.main + scripts + html.footer;
      });

      grunt.file.write(f.dest, src);
      grunt.log.ok('The file ' + f.dest + ' has been successfully created.');
    });
  });

};
