var grunt = require('grunt');
var test = require('ava');

test('default space', function(t) {
  var actual = grunt.file.read('tmp/default.html');
  var expected = grunt.file.read('test/expected/default.html');
  t.is(actual, expected);
  t.end();
});

test('default tab', function(t) {
  var actual = grunt.file.read('tmp/default_tab.html');
  var expected = grunt.file.read('test/expected/default_tab.html');
  t.is(actual, expected);
  t.end();
});

test('marked default value', function(t) {
  var actual = grunt.file.read('tmp/marked_default.html');
  var expected = grunt.file.read('test/expected/marked_default.html');
  t.is(actual, expected);
  t.end();
});

test('marked user value', function(t) {
  var actual = grunt.file.read('tmp/marked_mark.html');
  var expected = grunt.file.read('test/expected/marked_mark.html');
  t.is(actual, expected);
  t.end();
});

test('only js', function(t) {
  var actual = grunt.file.read('tmp/type_js.html');
  var expected = grunt.file.read('test/expected/type_js.html');
  t.is(actual, expected);
  t.end();
});

test('only css', function(t) {
  var actual = grunt.file.read('tmp/type_css.html');
  var expected = grunt.file.read('test/expected/type_css.html');
  t.is(actual, expected);
  t.end();
});

test('only css and marked files', function(t) {
  var actual = grunt.file.read('tmp/type_css_and_marked_mark.html');
  var expected = grunt.file.read('test/expected/type_css_and_marked_mark.html');
  t.is(actual, expected);
  t.end();
});

test('multiple assets', function(t) {
  var actual = grunt.file.read('tmp/multiple_assets.html');
  var expected = grunt.file.read('test/expected/multiple_assets.html');
  t.is(actual, expected);
  t.end();
});

test('nesting space', function(t) {
  var actual = grunt.file.read('tmp/nesting_space.html');
  var expected = grunt.file.read('test/expected/nesting_space.html');
  t.is(actual, expected);
  t.end();
});

test('nesting tab', function(t) {
  var actual = grunt.file.read('tmp/nesting_tab.html');
  var expected = grunt.file.read('test/expected/nesting_tab.html');
  t.is(actual, expected);
  t.end();
});
