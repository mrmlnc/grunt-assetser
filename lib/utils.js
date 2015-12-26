var path = require('path');
var fs = require('fs');
var grunt = require('grunt');
var Promise = require('promise');
var detectIndent = require('detect-indent');
var parse = require('./parse');
var minify = require('./minify');
var inject = require('./inject');

/**
 * Change indent
 *
 * @param str {String}
 * @param indent {String}
 * @param nesting {Boolean}
 * @returns {*}
 */
var changeCodeIndent = function(str, indent, nesting) {
  if (nesting) {
    str = str.replace(/\{_\}\{_\}/g, indent);
  } else {
    str = str.replace(/\{_\}/g, indent);
  }

  return str;
};

/**
 * Reading files in the directory
 *
 * @param dirPath {String|Array}
 * @param marker {String|Boolean}
 * @param type {String}
 * @returns {Array}
 * @private
 */
var _readAssetsDir = function(dirPath, marker, type) {
  marker = (marker) ? marker : '';
  type = (type) ? type : '+(js|css)';

  var listsOfFiles = [];
  if (typeof dirPath === 'object') {
    // If the path has several directories
    dirPath.forEach(function(dir) {
      listsOfFiles.push.apply(listsOfFiles, _readAssetsDir(dir, marker, type));
    });
  } else {
    listsOfFiles = grunt.file.expand({
      filter: 'isFile',
      matchBase: true,
      nonull: true,
      cwd: dirPath
    }, '*' + marker + '.' + type).map(function(file) {
      return path.join(dirPath, file);
    });
  }

  return listsOfFiles;
};

/**
 * Reading and optimization of the resource file
 *
 * @param filePath {String}
 * @returns {Promise}
 * @private
 */
var _readAssetFile = function(filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve({
          ext: path.extname(filePath),
          data: data
        });
      }
    });
  });
};

/**
 * The combination of files by type
 *
 * @param assets {Array}
 * @returns {{scripts: string, styles: string}}
 */
var _combineAssets = function(assets) {
  var js = '';
  var css = '';

  assets.forEach(function(resource) {
    if (resource.ext === '.js') {
      js += minify.js(resource.data);
    } else {
      css += minify.css(resource.data);
    }
  });

  return {
    scripts: (js) ? '{_}{_}<script id="assetser">' + js + '</script>\n' : '',
    styles: (css) ? '{_}{_}<style id="assetser">' + css + '</style>\n' : ''
  };
};

/**
 * Get content from assets files
 *
 * @param o {Object}
 * @return {Promise}
 */
module.exports.getAssetsContent = function(o) {
  var promises = _readAssetsDir(o.assetsDir, o.onlyMarked, o.onlyType).map(function(filePath) {
    return _readAssetFile(filePath);
  });

  return Promise.all(promises).then(_combineAssets);
};

/**
 * Preparation html file
 *
 * @param html
 * @returns {{head: string, main: string, footer: string, indent: actual, nesting: string}}
 */
module.exports.preparationHtml = function(html, assets) {
  var indent = detectIndent(html);

  // Definition indentation in file
  var headStartIndex = html.indexOf('<head>');

  // Definition of the head tag nesting in html tag
  var nestingHead = html.substring(0, headStartIndex);
  nestingHead = (nestingHead.indexOf(indent.indent) <= 0);
  var amount = (nestingHead) ? 0 : indent.amount;

  // Inject styles
  var styleTag = parse.parseContent(html, 'styles');
  var styles = changeCodeIndent(assets.styles, indent.indent, nestingHead);
  html = inject.inject(html, styleTag, amount, styles);

  // Inject scripts
  var scriptTag = parse.parseContent(html, 'scripts');
  var scripts = changeCodeIndent(assets.scripts, indent.indent, nestingHead);
  html = inject.inject(html, scriptTag, amount, scripts);

  return html;
};
