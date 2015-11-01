var path = require('path');
var fs = require('fs');
var grunt = require('grunt');
var Promise = require('promise');
var detectIndent = require('detect-indent');
var minify = require('./minify');

/**
 * Change indent
 *
 * @param str {String}
 * @param indent {String}
 * @param nesting {Boolean}
 * @returns {*}
 */
module.exports.changeCodeIndent = function(str, indent, nesting) {
  if (nesting) {
    str = str.replace(/\{_\}\{_\}/g, indent);
  } else {
    str = str.replace(/\{_\}/g, indent);
  }

  return str;
};

/**
 * Trim right spaces and tabs
 *
 * @param str {String}
 * @returns {String}
 * @private
 */
var _trimRight = function(str) {
  var tail = str.length;
  while (/[\s\uFEFF\u00A0]/.test(str[tail - 1])) {
    tail--;
  }

  return str.slice(0, tail);
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
    scripts: (js) ? '{_}{_}<script>' + js + '</script>\n' : '',
    styles: (css) ? '{_}{_}<style>' + css + '</style>\n' : ''
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
module.exports.preparationHtml = function(html) {
  var indent = detectIndent(html);

  // Definition indentation in file
  var headStartIndex = html.indexOf('<head>');
  var headEndIndex = html.indexOf('</head>');
  var bodyEndIndex = html.lastIndexOf('</body>');

  // Definition of the head tag nesting in html tag
  var nestingHead = html.substring(0, headStartIndex);
  nestingHead = (nestingHead.indexOf(indent.indent) <= 0);
  var amount = (nestingHead) ? 0 : indent.amount;

  // Get parts of HTML file
  var beforeHead = html.substring(0, headEndIndex);
  var headBody = html.substring(headEndIndex - amount, bodyEndIndex);
  var afterBody = html.substring(bodyEndIndex - amount);

  return {
    head: _trimRight(beforeHead) + '\n',
    main: _trimRight(headBody) + '\n',
    footer: afterBody,
    indent: indent.indent,
    nesting: nestingHead
  };
};
