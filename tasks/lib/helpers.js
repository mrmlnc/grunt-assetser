var grunt = require('grunt');
var path = require('path');
var detectIndent = require('detect-indent');
var indentString = require('indent-string');

module.exports = {

  /**
   * Get file extension
   * @param {String} filepath The path to the file
   * @returns {String}
   */
  getExtension: function(filepath) {
    return path.extname(filepath).slice(1);
  },

  /**
   * Get marker for files
   * @param {Boolean|String} marker
   * @returns {string}
   */
  getMarker: function(marker) {
   return (marker === true) ? '._inline' : marker;
  },

  /**
   * Detect the indentation of code
   * @param {String} html
   * @returns {Object}
   */
  getIndent: function(html) {
    return detectIndent(html);
  },

  /**
   *
   * @param {String} str
   * @param {String} indent
   * @returns {string}
   */
  changeIndent: function(str, indent) {
    return str.replace(/\{_\}/g, indent);
  },

  /**
   * Similar to String#trim() but removes only whitespace on the right
   * # https://github.com/sindresorhus/trim-right
   *
   * @param str
   * @returns {String}
   */
  trimRight: function(str) {
    var tail = str.length;

    while (/[\s\uFEFF\u00A0]/.test(str[tail - 1])) {
      tail--;
    }

    return str.slice(0, tail);
  },

  /**
   * Get a filtered list of asset resources from the directory
   * @param {String} filepath
   * @param {Boolean} marker
   * @param {Boolean} type
   * @returns {Array}
   */
  getAssetFiles: function(filepath, marker, type) {
    var pattern = '*' + ((marker) ? marker : '') + '.';
    pattern += (type) ? type : '+(js|css)';
    return grunt.file.expand({
      filter: 'isFile',
      matchBase: true,
      nonull: true,
      cwd: filepath
    }, pattern).map(function (file) {
      return path.join(filepath, file);
    });
  },

  /**
   * Adding tags to content in assets files
   * @param {Array} assets An array of asset resources
   * @returns {{scripts: string, styles: string}}
   */
  compileAssets: function(assets) {
    var _self = this;
    var js = '';
    var css = '';

    assets.forEach(function(filepath) {
      var assetRaw = grunt.file.read(filepath);
      var assetType = _self.getExtension(filepath);
      var output = indentString(assetRaw, '{_}');

      if (assetType === 'js') {
        js += indentString(output, '{_}{_}');
      } else {
        css += indentString(output, '{_}{_}');
      }
    });

    return {
      scripts: (js) ? '{_}{_}<script>\n' + js + '{_}{_}</script>\n' : '',
      styles: (css) ? '{_}{_}<style>\n' + css + '{_}{_}</style>\n' : ''
    };
  },

  /**
   * Selection of composite template parts for injection and identifying indent
   * @param {String} html The contents of an HTML file
   * @returns {{block: {head: string, main: string, footer: string}, indent: string}}
   */
  preparationHtml: function(html) {
    var indent = this.getIndent(html);
    var headIndex = html.indexOf('</head>');
    var bodyIndex = html.indexOf('</body>');

    var beforeHead = html.substring(0, headIndex);
    var headBody = html.substring(headIndex - indent.amount, bodyIndex);
    var afterBody = html.substring(bodyIndex - indent.amount);

    return {
      head: this.trimRight(beforeHead) + '\n',
      main: this.trimRight(headBody) + '\n',
      footer: afterBody,
      indent: indent.indent
    };
  }

};
