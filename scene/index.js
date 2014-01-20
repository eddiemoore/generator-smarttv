'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var SceneGenerator = module.exports = function SceneGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the scene subgenerator with the argument ' + this.name + '.');

  this.sceneName = toTitleCase(this.name);
  this.coffee = options.coffee;
  this.sass = options.sass;
};

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

util.inherits(SceneGenerator, yeoman.generators.NamedBase);

SceneGenerator.prototype.files = function files() {
  var ext = this.coffee ? 'coffee' : 'js';
  this.template('scene.' + ext, 'src/app/scenes/' + this.sceneName + '.' + ext);
  this.template('scene.html', 'src/app/htmls/' + this.sceneName + '.html');

  ext = this.sass ? 'scss' : 'css';
  this.template('scene.' + ext, 'src/app/stylesheets/' + this.sceneName + '.' + ext);
};
