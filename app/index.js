'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SmartTVGenerator = module.exports = function SmartTVGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';
  this.noAppFramework = options['no-app-framework'] ? true : false;
  this.coffee = options.coffee;

  // for hooks to resolve on mocha by default
  options['test-framework'] = this.testFramework;

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', {
    as: 'app',
    options: {
      options: {
        'skip-install': options['skip-install-message'],
        'skip-message': options['skip-install']
      }
    }
  });

  this.options = options;

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SmartTVGenerator, yeoman.generators.Base);

SmartTVGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // welcome message
    if (!this.options['skip-welcome-message']) {
        console.log(this.yeoman);
        //console.log(chalk.magenta('Out of the box I include jQuery, and a Gruntfile.js to build your app.'));
    }

    var prompts = [{
            type: 'checkbox',
            name: 'features',
            message: 'What more would you like?',
            choices: [{
                    name: 'Sass with Compass',
                    value: 'includeCompass',
                    checked: true
                }, {
                    name: 'Bootstrap',
                    value: 'includeBootstrap',
                    checked: true
                }]
            },
            {
                type: 'list',
                name: 'apptype',
                message: 'What type of app are you making?',
                choices: [{
                    name: 'Videos',
                    value: 'Videos'
                },
                {
                    name: 'Games',
                    value: 'Games'
                },
                {
                    name: 'Sports',
                    value: 'Sports'
                },
                {
                    name: 'Lifestyle',
                    value: 'Lifestyle'
                },
                {
                    name: 'Information',
                    value: 'Information'
                },
                {
                    name: 'Education',
                    value: 'Education'
                }]
            }];

    this.prompt(prompts, function (answers) {
        var features = answers.features;
        this.apptype = answers.apptype;

        function hasFeature(feat) { return features.indexOf(feat) !== -1; }

        // manually deal with the response, get back and store the results.
        // we change a bit this way of doing to automatically do this in the self.prompt() method.
        this.includeCompass = hasFeature('includeCompass');
        this.includeBootstrap = hasFeature('includeBootstrap');
        cb();
    }.bind(this));
};

SmartTVGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js');
};

SmartTVGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

SmartTVGenerator.prototype.git = function git() {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
};

SmartTVGenerator.prototype.bower = function bower() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
};

SmartTVGenerator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};



SmartTVGenerator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

SmartTVGenerator.prototype.mainStylesheet = function mainStylesheet() {
    var css;
    if (this.noAppFramework) {
        css = 'main.' + (this.includeCompass ? 's' : '') + 'css';
        this.copy(css, 'src/stylesheets/' + css);
    } else {
        css = 'Main.' + (this.includeCompass ? 's' : '') + 'css';
        this.template('af/app/stylesheets/' + css, 'src/app/stylesheets/' + css);
    }
};

SmartTVGenerator.prototype.mainJavaScript = function mainJavaScript() {
    var js;
    if (this.noAppFramework) {
        js = 'scripts/main.' + (this.coffee ? 'coffee' : 'js');
        this.copy(js, 'src/' + js);
    } else {
        js = 'Main.' + (this.coffee ? 'coffee' : 'js');
        this.copy('af/app/scenes/' + js, 'src/app/scenes/' + js);
    }
};

//Only for use with app framework
SmartTVGenerator.prototype.initFile = function initFile() {
    if (!this.noAppFramework) {
        var js = 'init.' + (this.coffee ? 'coffee' : 'js');
        this.copy('af/app/' + js, 'src/app/' + js);
    }
};

SmartTVGenerator.prototype.appJSON = function appJSON() {
    if (!this.noAppFramework) {
        this.copy('af/app.json', 'src/app.json');
    }
};

SmartTVGenerator.prototype.widgetInfo = function widgetInfo() {
    if (!this.noAppFramework) {
        this.copy('af/widget.info', 'src/widget.info');
    }
};

SmartTVGenerator.prototype.writeHtmls = function() {
    if (!this.noAppFramework) {
        this.copy('af/app/htmls/Main.html', 'src/app/htmls/Main.html');
    }
};

SmartTVGenerator.prototype.writeIndex = function writeIndex() {

    var index = 'index.html';
    if (!this.noAppFramework) {
        index = 'af/' + index;
    }

    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), index));
    this.indexFile = this.engine(this.indexFile, this);

    // wire Twitter Bootstrap plugins
    if (this.includeBootstrap) {
        var bs = (this.noAppFramework ? '' : 'app/') + 'bower_components/' + (this.includeCompass ? 'sass-' : '') + 'bootstrap/js/';
        this.indexFile = this.appendScripts(this.indexFile, 'app/vendor/plugins.js', [
            bs + 'affix.js',
            bs + 'alert.js',
            bs + 'dropdown.js',
            bs + 'tooltip.js',
            bs + 'modal.js',
            bs + 'transition.js',
            bs + 'button.js',
            bs + 'popover.js',
            bs + 'carousel.js',
            bs + 'scrollspy.js',
            bs + 'collapse.js',
            bs + 'tab.js'
        ]);
    }

    if (this.noAppFramework) {
        this.indexFile = this.appendFiles({
            html: this.indexFile,
            fileType: 'js',
            optimizedPath: 'scripts/main.js',
            sourceFileList: ['scripts/main.js'],
            searchPath: '{app,.tmp}'
        });
    }
};

SmartTVGenerator.prototype.writeConfigXML = function jshint() {
    this.copy('config.xml', 'src/config.xml');
};

SmartTVGenerator.prototype.app = function app() {
    this.mkdir('src');

    if (this.noAppFramework) {
        this.mkdir('src/scripts');
        this.mkdir('src/stylesheets');
        this.mkdir('src/images');
    } else {
        this.mkdir('src/app');
        this.mkdir('src/app/scenes');
        this.mkdir('src/app/htmls');
        this.mkdir('src/app/stylesheets');
        this.mkdir('src/app/images');
    }
    this.write('src/index.html', this.indexFile);
};

SmartTVGenerator.prototype.imageFiles = function () {
    this.sourceRoot(path.join(__dirname, 'templates'));
    var dir = this.noAppFramework ? 'src/' : 'src/app/'
    this.directory('images', dir + 'images', true);
};

SmartTVGenerator.prototype.install = function () {
    if (this.options['skip-install']) {
        return;
    }

    var done = this.async();
    this.installDependencies({
        skipMessage: this.options['skip-install-message'],
        skipInstall: this.options['skip-install'],
        callback: done
    });
};
