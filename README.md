# generator-smarttv [![Build Status](https://secure.travis-ci.org/eddiemoore/generator-smarttv.png?branch=master)](https://travis-ci.org/eddiemoore/generator-smarttv) [![Coverage Status](https://coveralls.io/repos/eddiemoore/generator-smarttv/badge.png)](https://coveralls.io/r/eddiemoore/generator-smarttv) [![Dependency Status](https://gemnasium.com/eddiemoore/generator-smarttv.png)](https://gemnasium.com/eddiemoore/generator-smarttv)

A generator for [Yeoman](http://yeoman.io) to scaffold a Samsung SmartTV application.

**NOTE: I haven't had the chance to update this in a while because of my work**

## Features

* CSS Autoprefixing
* Built-in preview server with LiveReload
* Automagically compile CoffeeScript & Compass
* Automagically lint your scripts
* Automagically wire up your Bower components with [bower-install](#third-party-dependencies).
* Awesome Image Optimization (via OptiPNG, pngquant, jpegtran and gifsicle)
* Mocha Unit Testing with PhantomJS
* Optional - Twitter Bootstrap for SASS

## Getting Started

- Make sure you have installed [yo](https://github.com/yeoman/yo): `npm install -g yo` and [grunt](http://gruntjs.com/): `npm install -g grunt-cli`.
- Install the generator: `npm install -g generator-smarttv`
- Run: `yo smarttv`
- Run: `grunt` for building and `grunt serve` for preview

See the [documentation on Samsung SmartTV apps](http://www.samsungdforum.com/guide/) for help with creating applications.

# Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `--test-framework=<framework>`

  Defaults to `mocha`. Can be switched for another supported testing framework like `jasmine`.

* `--coffee`

  Add support for [CoffeeScript](http://coffeescript.org/).


# Scene Subgenerator

* `yo smarttv:scene <scene_name>`

## Options for subgenerator

* `--coffee`

  Add support for [CoffeeScript](http://coffeescript.org/).

* `--sass`

  Creates stylesheet in SCSS format.


## Todo
- Create icons
- Get `grunt serve` to load app in VirtualBox

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
