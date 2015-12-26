/**
 * Parse HTML
 *
 * @param {String} html
 * @param {String} mode
 */
module.exports.parseContent = function(html, mode) {
  var tagName = (mode === 'styles') ? 'style' : 'script';
  var isTag = html.indexOf('<' + tagName + ' id="assetser">') + 1;

  var startIndex;
  var endIndex;
  // If this is the second launch
  if (isTag) {
    // Just looking for tag
    startIndex = isTag - 1;
    endIndex = html.indexOf('</' + tagName + '>', startIndex) + 3 + tagName.length;
  } else {
    // If the first, then the parse structure
    startIndex = html.indexOf((mode === 'styles') ? '</head>' : '</body');
  }

  return {
    start: startIndex,
    end: endIndex
  };
};
