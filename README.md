# grunt-assetser

[![Greenkeeper badge](https://badges.greenkeeper.io/mrmlnc/grunt-assetser.svg)](https://greenkeeper.io/)

> Inserting the contents of external CSS and JavaScript files directly into the HTML document.

[![Travis](https://img.shields.io/travis/mrmlnc/grunt-assetser.svg?style=flat-square)](https://travis-ci.org/mrmlnc/grunt-assetser)
[![NPM version](https://img.shields.io/npm/v/grunt-assetser.svg?style=flat-square)](https://www.npmjs.com/package/grunt-assetser)
[![devDependency Status](https://img.shields.io/david/mrmlnc/grunt-assetser.svg?style=flat-square)](https://david-dm.org/mrmlnc/grunt-assetser#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/mrmlnc/grunt-assetser.svg?style=flat-square)](https://david-dm.org/mrmlnc/grunt-assetser#info=devDependencies)

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-assetser --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-assetser');
```

## The assetser task
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

#### options.verbose
Type: `Boolean` Default: `true`

Display information about the processed files.

```
Running "assetser:default_options" (assetser) task
>> The file tmp/default.html has been successfully created.
>> The file tmp/default_tab.html has been successfully created.
```

### Example of work

#### Before
```js
// assets/file.js
( function () { ... } )();
```

```css
// assets/file.css
.class { ... }
```

#### After

```html
<!doctype html>
<html lang="en">
  <head>
    ...
    <style>.class{ ... }</style>
  </head>
  <body>
    ...
    <script>(function(){ ... })();</script>
  </body>
</html>
```

### Usage Examples

#### Working with one HTML file
```js
grunt.initConfig({
  assetser: {
    main: {
      options: {
        assetsDir: 'app/assets'
      },
      // like this
      files: {
        'build/index.html': 'app/index.html',
        'tmp/test.html': 'app/index.html'
      }
      // or
      src: 'app/index.html',
      dest: 'build/index.html'
    }
  }
});
```

#### Working with multiple HTML files
```js
grunt.initConfig({
  assetser: {
    main: {
      options: {
        assetsDir: 'app/assets'
      },
      files: [{
        expand: true,
        cwd: 'app',
        src: '*.html',
        dest: 'build'
      }]
    }
  }
});
```

#### Working with multiple assets directories
```js
grunt.initConfig({
  assetser: {
    main: {
      options: {
        assetsDir: ['app/assets/styles', 'app/assets/scripts']
      },
      files: [{
        expand: true,
        cwd: 'app',
        src: '*.html',
        dest: 'tmp'
      }]
    }
  }
});
```



## Release History

 - 2016-02-22   v1.1.1   Compatibility with Grunt version 1.0.0.
 - 2015-12-27   v1.1.0   Verbose option and overwrite the content instead of adding at the end
 - 2015-11-01   v1.0.0   Optimization of combination of resource files
 - 2015-10-31   v0.1.5   Cleaning code
 - 2015-09-13   v0.1.4   Added XO
 - 2015-09-09   v0.1.3   Refactoring and tests by Ava
 - 2015-07-27   v0.1.2   Automatic definition of the head tag nesting in html
 - 2015-07-24   v0.1.1   Fix errors when working with multiple assets directories
 - 2015-07-24   v0.1.0   Initialization
