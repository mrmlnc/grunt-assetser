# grunt-assetser

> Inject assets files (js, css) into HTML files.

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

 * 2015-07-24   v0.1.1   Fix errors when working with multiple assets directories
 * 2015-07-24   v0.1.0   Initialization
