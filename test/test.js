var fs = require('fs');
var test = require('ava');

test('default space', function(t) {
  var actual = fs.readFileSync('tmp/default.html');
  var expected = fs.readFileSync('test/expected/default.html');
  t.is(actual, expected);
  t.end();
});

test('default tab', function(t) {
  var actual = fs.readFileSync('tmp/default_tab.html');
  var expected = fs.readFileSync('test/expected/default_tab.html');
  t.is(actual, expected);
  t.end();
});

test('marked default value', function(t) {
  var actual = fs.readFileSync('tmp/marked_default.html');
  var expected = fs.readFileSync('test/expected/marked_default.html');
  t.is(actual, expected);
  t.end();
});

test('marked user value', function(t) {
  var actual = fs.readFileSync('tmp/marked_mark.html');
  var expected = fs.readFileSync('test/expected/marked_mark.html');
  t.is(actual, expected);
  t.end();
});

test('only js', function(t) {
  var actual = fs.readFileSync('tmp/type_js.html');
  var expected = fs.readFileSync('test/expected/type_js.html');
  t.is(actual, expected);
  t.end();
});

test('only css', function(t) {
  var actual = fs.readFileSync('tmp/type_css.html');
  var expected = fs.readFileSync('test/expected/type_css.html');
  t.is(actual, expected);
  t.end();
});

test('only css and marked files', function(t) {
  var actual = fs.readFileSync('tmp/type_css_and_marked_mark.html');
  var expected = fs.readFileSync('test/expected/type_css_and_marked_mark.html');
  t.is(actual, expected);
  t.end();
});

test('multiple assets', function(t) {
  var actual = fs.readFileSync('tmp/multiple_assets.html');
  var expected = fs.readFileSync('test/expected/multiple_assets.html');
  t.is(actual, expected);
  t.end();
});

test('nesting space', function(t) {
  var actual = fs.readFileSync('tmp/nesting_space.html');
  var expected = fs.readFileSync('test/expected/nesting_space.html');
  t.is(actual, expected);
  t.end();
});

test('nesting tab', function(t) {
  var actual = fs.readFileSync('tmp/nesting_tab.html');
  var expected = fs.readFileSync('test/expected/nesting_tab.html');
  t.is(actual, expected);
  t.end();
});
