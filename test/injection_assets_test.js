'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.assetser = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default.html');
    var expected = grunt.file.read('test/expected/default.html');
    test.equal(actual, expected, 'A task with the default options');

    test.done();
  },
  default_options_tab: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_tab.html');
    var expected = grunt.file.read('test/expected/default_tab.html');
    test.equal(actual, expected, 'A task with the default options');

    test.done();
  },
  marked_default: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/marked_default.html');
    var expected = grunt.file.read('test/expected/marked_default.html');
    test.equal(actual, expected, 'A task with processing only marked files');

    test.done();
  },
  marked_mark: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/marked_mark.html');
    var expected = grunt.file.read('test/expected/marked_mark.html');
    test.equal(actual, expected, 'A task with processing only files with `mark` in name.');

    test.done();
  },
  type_js: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/type_js.html');
    var expected = grunt.file.read('test/expected/type_js.html');
    test.equal(actual, expected, 'A task with processing only .js files.');

    test.done();
  },
  type_css: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/type_css.html');
    var expected = grunt.file.read('test/expected/type_css.html');
    test.equal(actual, expected, 'A task with processing only .css files.');

    test.done();
  },
  type_css_and_marked_mark: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/type_css_and_marked_mark.html');
    var expected = grunt.file.read('test/expected/type_css_and_marked_mark.html');
    test.equal(actual, expected, 'A task with processing only .css files and files with `mark` in name.');

    test.done();
  },
  multiple_assets: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/multiple_assets.html');
    var expected = grunt.file.read('test/expected/multiple_assets.html');
    test.equal(actual, expected, 'A task with multiple assets directories.');

    test.done();
  },

  /**
   * Nesting
   */
  nesting_space: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/nesting_space.html');
    var expected = grunt.file.read('test/expected/nesting_space.html');
    test.equal(actual, expected, 'A task with multiple assets directories.');

    test.done();
  },
  nesting_tab: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/nesting_tab.html');
    var expected = grunt.file.read('test/expected/nesting_tab.html');
    test.equal(actual, expected, 'A task with multiple assets directories.');

    test.done();
  }
};
