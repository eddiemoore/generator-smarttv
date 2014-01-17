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


    it('creates expected files in non app framework mode', function (done) {
        var expected = [
          ['bower.json', /"name": "temp"/],
          ['package.json', /"name": "temp"/],
          ['Gruntfile.js', /coffee:/],
          'app/index.html',
          'app/config.xml',
          'app/scripts/main.coffee',
          'app/stylesheets/main.scss'
        ];

        helpers.mockPrompt(this.app, {
            features: ['includeCompass']
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
          'app/index.html',
          'app/config.xml',
          'app/scripts/main.js',
          'app/stylesheets/main.scss'
        ];

        helpers.mockPrompt(this.app, {
          features: ['includeCompass']
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
          'app/index.html',
          'app/config.xml',
          'app/scripts/main.js',
          'app/stylesheets/main.scss'
        ];

        helpers.mockPrompt(this.app, {
          features: ['includeCompass']
        });

        this.app.options['skip-install'] = true;
        this.app.noAppFramework = true;
        this.app.run({}, function () {
          helpers.assertFiles(expected);
          done();
        });
    });
});
