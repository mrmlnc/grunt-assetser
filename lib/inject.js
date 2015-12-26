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
 * Inject content of assets to HTML
 *
 * @param {String} html
 * @param {Object} positions
 * @param {Integer} amount
 * @param {String} assets
 */
module.exports.inject = function(html, positions, amount, assets) {
  var beforeTag;
  var afterTag;

  // If this is the first launch
  if (positions.end === undefined) {
    // just parse the structure of the file
    beforeTag = html.substring(0, positions.start);
    afterTag = html.substring(positions.start - amount);
  } else {
    // If the second, then looking for tag
    beforeTag = html.substring(0, positions.start);
    afterTag = html.substring(positions.end);
    assets = _trimRight(assets);
  }

  var head = _trimRight(beforeTag) + '\n';
  var main = afterTag;

  return head + assets + main;
};
