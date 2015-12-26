var fs = require('fs');
var test = require('ava');

test.cb('default space', function(t) {
  var actual = fs.readFileSync('../tmp/default.html', 'utf8');
  var expected = fs.readFileSync('expected/default.html', 'utf8');
  t.is(actual, expected);
  t.end();
});

test.cb('default tab', function(t) {
  var actual = fs.readFileSync('../tmp/default_tab.html', 'utf8');
  var expected = fs.readFileSync('expected/default_tab.html', 'utf8');
  t.is(actual, expected);
  t.end();
});

test.cb('marked default value', function(t) {
  var actual = fs.readFileSync('../tmp/marked_default.html', 'utf8');
  var expected = fs.readFileSync('expected/marked_default.html', 'utf8');
  t.is(actual, expected);
  t.end();
});

test.cb('marked user value', function(t) {
  var actual = fs.readFileSync('../tmp/marked_mark.html', 'utf8');
  var expected = fs.readFileSync('expected/marked_mark.html', 'utf8');
  t.is(actual, expected);
  t.end();
});

test.cb('only js', function(t) {
  var actual = fs.readFileSync('../tmp/type_js.html', 'utf8');
  var expected = fs.readFileSync('expected/type_js.html', 'utf8');
  t.is(actual, expected);
  t.end();
});

test.cb('only css', function(t) {
  var actual = fs.readFileSync('../tmp/type_css.html', 'utf8');
  var expected = fs.readFileSync('expected/type_css.html', 'utf8');
  t.is(actual, expected);
  t.end();
});

test.cb('only css and marked files', function(t) {
  var actual = fs.readFileSync('../tmp/type_css_and_marked_mark.html', 'utf8');
  var expected = fs.readFileSync('expected/type_css_and_marked_mark.html', 'utf8');
  t.is(actual, expected);
  t.end();
});

test.cb('multiple assets', function(t) {
  var actual = fs.readFileSync('../tmp/multiple_assets.html', 'utf8');
  var expected = fs.readFileSync('expected/multiple_assets.html', 'utf8');
  t.is(actual, expected);
  t.end();
});

test.cb('nesting space', function(t) {
  var actual = fs.readFileSync('../tmp/nesting_space.html', 'utf8');
  var expected = fs.readFileSync('expected/nesting_space.html', 'utf8');
  t.is(actual, expected);
  t.end();
});

test.cb('nesting tab', function(t) {
  var actual = fs.readFileSync('../tmp/nesting_tab.html', 'utf8');
  var expected = fs.readFileSync('expected/nesting_tab.html', 'utf8');
  t.is(actual, expected);
  t.end();
});

test.cb('second run', function(t) {
  var actual = fs.readFileSync('../tmp/second_run.html', 'utf8');
  var expected = fs.readFileSync('expected/second_run.html', 'utf8');
  t.is(actual, expected);
  t.end();
});
