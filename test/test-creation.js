/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('smarttv generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('smarttv:app', [
                '../../app', [
                  helpers.createDummyGenerator(),
                  'mocha:app'
                ]
            ]);
            done();
        }.bind(this));
    });

    it('the generator can be required without throwing', function () {
        // not testing the actual run of generators yet
        this.app = require('../app');
    });

    /** ==============================================================================
        Non App Framework
        ============================================================================*/
    it('creates expected files in non app framework mode', function (done) {
        var expected = [
          ['bower.json', /"name": "temp"/],
          ['package.json', /"name": "temp"/],
          ['Gruntfile.js', /coffee:/],
          'src/index.html',
          'src/config.xml',
          'src/scripts/main.coffee',
          'src/stylesheets/main.scss'
        ];

        helpers.mockPrompt(this.app, {
            features: ['includeCompass'],
            apptype: 'Video'
        });

        this.app.coffee = true;
        this.app.noAppFramework = true;
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    it('creates expected files in non-AMD non-coffee mode and non app framework mode', function (done) {
        var expected = [
          ['bower.json', /"name": "temp"/],
          ['package.json', /"name": "temp"/],
          'Gruntfile.js',
          'src/index.html',
          'src/config.xml',
          'src/scripts/main.js',
          'src/stylesheets/main.scss'
        ];

        helpers.mockPrompt(this.app, {
          features: ['includeCompass'],
            apptype: 'Video'
        });

        this.app.coffee = false;
        this.app.noAppFramework = true;
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
          helpers.assertFiles(expected);
          done();
        });
    });

    it('creates expected files in AMD mode and non app framework mode', function (done) {
        var expected= [
          ['bower.json', /"name": "temp"/],
          ['package.json', /"name": "temp"/],
          'Gruntfile.js',
          'src/index.html',
          'src/config.xml',
          'src/scripts/main.js',
          'src/stylesheets/main.scss'
        ];

        helpers.mockPrompt(this.app, {
          features: ['includeCompass'],
            apptype: 'Video'
        });

        this.app.noAppFramework = true;
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
          helpers.assertFiles(expected);
          done();
        });
    });


    /** ==============================================================================
        App Framework
        ============================================================================*/

    it('creates expected files in app framework mode', function (done) {
        var expected = [
          ['bower.json', /"name": "temp"/],
          ['package.json', /"name": "temp"/],
          ['Gruntfile.js', /coffee:/],
          'src/index.html',
          'src/config.xml',
          'src/app.json',
          'src/widget.info',
          'src/app/init.coffee',
          'src/app/scenes/Main.coffee',
          'src/app/stylesheets/Main.scss',
          'src/app/htmls/Main.html'
        ];

        helpers.mockPrompt(this.app, {
            features: ['includeCompass'],
            apptype: 'Video'
        });

        this.app.coffee = true;
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    it('creates expected files in non-AMD non-coffee mode in app framework mode', function (done) {
        var expected = [
          ['bower.json', /"name": "temp"/],
          ['package.json', /"name": "temp"/],
          'Gruntfile.js',
          'src/index.html',
          'src/config.xml',
          'src/app.json',
          'src/widget.info',
          'src/app/init.js',
          'src/app/scenes/Main.js',
          'src/app/stylesheets/Main.scss',
          'src/app/htmls/Main.html'
        ];

        helpers.mockPrompt(this.app, {
          features: ['includeCompass'],
            apptype: 'Video'
        });

        this.app.coffee = false;
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
          helpers.assertFiles(expected);
          done();
        });
    });

    it('creates expected files in AMD mode in app framework mode', function (done) {
        var expected= [
          ['bower.json', /"name": "temp"/],
          ['package.json', /"name": "temp"/],
          'Gruntfile.js',
          'src/index.html',
          'src/config.xml',
          'src/app.json',
          'src/widget.info',
          'src/app/init.js',
          'src/app/scenes/Main.js',
          'src/app/stylesheets/Main.scss',
          'src/app/htmls/Main.html'
        ];

        helpers.mockPrompt(this.app, {
          features: ['includeCompass'],
            apptype: 'Video'
        });

        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
          helpers.assertFiles(expected);
          done();
        });
    });

    /**
        Scene generator
    */

    it('should generate a new scene', function(done) {
        var name = 'foo';
        var deps = [path.join('../../', 'scene')];
        var smarttvGenerator = helpers.createGenerator('smarttv:scene', deps, [name]);

        helpers.mockPrompt(this.app, {
            features: ['includeCompass'],
            apptype: 'Video'
        });

        this.app.options['skip-install'] = true;
        this.app.run({}, function() {
            smarttvGenerator.run({}, function() {
                helpers.assertFiles([
                    [path.join('src/app/scenes', 'Foo' + '.js')],
                    [path.join('src/app/htmls', 'Foo' + '.html')],
                    [path.join('src/app/stylesheets', 'Foo' + '.css')],
                ]);
                done();
            });
        });
    });

    it('should generate a new scene with coffee and sass', function(done) {
        var name = 'foo';
        var deps = [path.join('../../', 'scene')];
        var smarttvGenerator = helpers.createGenerator('smarttv:scene', deps, [name]);

        helpers.mockPrompt(this.app, {
            features: ['includeCompass'],
            apptype: 'Video'
        });

        this.app.options['skip-install'] = true;
        this.app.run({}, function() {
            smarttvGenerator.coffee = true;
            smarttvGenerator.sass = true;
            smarttvGenerator.run({}, function() {
                helpers.assertFiles([
                    [path.join('src/app/scenes', 'Foo' + '.coffee')],
                    [path.join('src/app/htmls', 'Foo' + '.html')],
                    [path.join('src/app/stylesheets', 'Foo' + '.scss')],
                ]);
                done();
            });
        });
    });
});
