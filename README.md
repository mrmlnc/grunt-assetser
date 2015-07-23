# grunt-assetser

> Insert specific .js .css files in HTML files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-assetser --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-assetser');
```

## The "injection_assets" task
_Run this task with the `grunt assetser` command._

Task targets, files and options may be specified according to the Grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### options.assetsDir (required)
Type: `String` Default: empty string

This string will be used as the path to the resources that will be added in the HTML files. **This is a required parameter!**

#### options.onlyMarked
Type: `String` `Boolean` Default: `false`

Add only those files that contain in its name, the specified string.

If you choose `true`, then will be used value `._inline`.

#### options.onlyType
Type: `String` Default: empty string

Add only files the type specified by in this parameter. Supported: `js`, `css`.

### Usage Examples

#### Working with one HTML file
```js
grunt.initConfig({
  assetser: {
    options: {
      assetsDir: 'test/fixtures/assets'
    },
    // like this
    files: {
      'tmp/default.html': 'test/fixtures/blank.html'
      'tmp/default_tab.html': 'test/fixtures/blank_tab.html'
    }
    // or
    src: 'test/fixtures/blank.html',
    dest: 'tmp/default.html'
  }
});
```

#### Working with multiple HTML files
```js
grunt.initConfig({
  assetser: {
    options: {
      assetsDir: 'test/fixtures/assets'
    },
    files: [{
      expand: true,
      cwd: 'test/fixtures',
      src: '*.html',
      dest: 'tmp'
    }]
  }
});
```

## Release History

 * 2015-07-24   v0.1.0   Initialization
