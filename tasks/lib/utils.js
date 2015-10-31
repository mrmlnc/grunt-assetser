var grunt = require('grunt');
var path = require('path');
var detectIndent = require('detect-indent');
var indentString = require('indent-string');

function Utils(options) {
  this.options = options;
}

Utils.prototype.changeCodeIndent = function(str, indent, nesting) {
  if (nesting) {
    str = str.replace(/\{_\}\{_\}/g, indent);
    str = str.replace(/\{_\}/g, indent);
  } else {
    str = str.replace(/\{_\}/g, indent);
  }

  return str;
};

Utils.prototype.trimRight = function(str) {
  var tail = str.length;
  while (/[\s\uFEFF\u00A0]/.test(str[tail - 1])) {
    tail--;
  }

  return str.slice(0, tail);
};

Utils.prototype.getDirectoryFiles = function(dirPath, marker, type) {
  marker = (marker) ? marker : '';
  type = (type) ? type : '+(js|css)';

  return grunt.file.expand({
    filter: 'isFile',
    matchBase: true,
    nonull: true,
    cwd: dirPath
  }, '*' + marker + '.' + type).map(function (file) {
    return path.join(dirPath, file);
  });
};

Utils.prototype.getAssetFiles = function() {
  var o = this.options;
  var that = this;
  var paths = [];
  if (typeof o.assetsDir === 'object') {
    o.assetsDir.forEach(function(filepath) {
      var files = that.getDirectoryFiles(filepath, o.onlyMarked, o.onlyType);
      paths.push.apply(paths, files);
    });
  } else {
    return this.getDirectoryFiles(o.assetsDir, o.onlyMarked, o.onlyType);
  }

  return paths;
};

Utils.prototype.combineAssets = function(assets) {
  var js = '';
  var css = '';

  assets.forEach(function(filePath) {
    var output = indentString(grunt.file.read(filePath), '{_}');

    if (path.extname(filePath) === '.js') {
      js += indentString(output, '{_}{_}');
    } else {
      css += indentString(output, '{_}{_}');
    }
  });

  return {
    scripts: (js) ? '{_}{_}<script>\n' + js + '{_}{_}</script>\n' : '',
    styles: (css) ? '{_}{_}<style>\n' + css + '{_}{_}</style>\n' : ''
  };
};

Utils.prototype.preparationHtml = function(html) {
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
    head: this.trimRight(beforeHead) + '\n',
    main: this.trimRight(headBody) + '\n',
    footer: afterBody,
    indent: indent.indent,
    nesting: nestingHead
  };
};

module.exports = Utils;
