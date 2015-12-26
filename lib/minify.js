var jsmin = require('jsmin2');

module.exports.css = function(s) {
  s = s.replace(/\/\*(.|\n|\r)*?\*\//g, '');
  s = s.replace(/\s*([\{\}\:\;\,])\s*/g, '$1');
  s = s.replace(/\,[\s\.\#\d]*\{/g, '{');
  s = s.replace(/;\s*;/g, ';');
  return s.trim();
};

module.exports.js = function(s) {
  s = s.replace(/(\r|\n)/g, '');
  return jsmin(s).code.trim();
};
