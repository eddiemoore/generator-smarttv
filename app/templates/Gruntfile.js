// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'src',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {<% if (coffee) { if (noAppFramework) { %>
            coffee: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
                tasks: ['coffee:dist']
            },<% } else { %>
            coffee: {
                files: ['<%%= yeoman.app %>/{,*/}*.{coffee,litcoffee,coffee.md}'],
                tasks: ['coffee:dist']
            },<% } %>
            coffeeTest: {
                files: ['test/spec/{,*/}*.{coffee,litcoffee,coffee.md}'],
                tasks: ['coffee:test', 'test:watch']
            },<% } else { %>
            js: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },<% } %>
            gruntfile: {
                files: ['Gruntfile.js']
            },<% if (includeCompass) { if (noAppFramework) { %>
            compass: {
                files: ['<%%= yeoman.app %>/stylesheets/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },<% } else { %>
            compass: {
                files: ['<%%= yeoman.app %>/app/stylesheets/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },<% }} %>
            styles: {
                files: ['<%%= yeoman.app %>/stylesheets/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%%= yeoman.app %>/{,*/}*.html',<% if (noAppFramework) { %>
                    '.tmp/stylesheets/{,*/}*.css',<% if (coffee) { %>
                    '.tmp/scripts/{,*/}*.js',<% } %>
                    '<%%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'<% } else { %>
                    '.tmp/app/stylesheets/{,*/}*.css',<% if (coffee) { %>
                    '.tmp/app/**/*.js',<% } %>
                    '<%%= yeoman.app %>/app/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'<% } %>
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%%= yeoman.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',<% if (noAppFramework) { %>
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/vendor/*',<% } else { %>
                '<%%= yeoman.app %>/app/**/*.js',<% } %>
                'test/spec/{,*/}*.js'
            ]
        },

<% if (testFramework === 'mocha') { %>
        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%%= connect.test.options.hostname %>:<%%= connect.test.options.port %>/index.html']
                }
            }
        },<% } else if (testFramework === 'jasmine') { %>
        // Jasmine testing framework configuration options
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },<% } %>

<% if (coffee) { %>
        // Compiles CoffeeScript to JavaScript
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/<% if (!noAppFramework) { %>app/<% } %>scripts',
                    src: '{,*/}*.{coffee,litcoffee,coffee.md}',
                    dest: '.tmp/<% if (!noAppFramework) { %>app/<% } else { %>scripts<% } %>',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.{coffee,litcoffee,coffee.md}',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },<% } %>

<% if (includeCompass) { %>
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/<% if (!noAppFramework) { %>app/<% } %>stylesheets',
                cssDir: '.tmp/<% if (!noAppFramework) { %>app/<% } %>stylesheets',
                generatedImagesDir: '.tmp/<% if (!noAppFramework) { %>app/<% } %>images/generated',
                imagesDir: '<%%= yeoman.app %>/<% if (!noAppFramework) { %>app/<% } %>images',
                javascriptsDir: '<%%= yeoman.app %>/<% if (!noAppFramework) { %>app/<% } else { %>scripts<% } %>',
                fontsDir: '<%%= yeoman.app %>/<% if (!noAppFramework) { %>app/<% } %>stylesheets/fonts',
                importPath: '<%%= yeoman.app %>/<% if (!noAppFramework) { %>app/<% } %>bower_components',
                httpImagesPath: '/<% if (!noAppFramework) { %>app/<% } %>images',
                httpGeneratedImagesPath: '/<% if (!noAppFramework) { %>app/<% } %>images/generated',
                httpFontsPath: '/<% if (!noAppFramework) { %>app/<% } %>stylesheets/fonts',
                relativeAssets: true,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= yeoman.dist %>/<% if (!noAppFramework) { %>app/<% } %>images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },<% } %>

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/<% if (!noAppFramework) { %>app/<% } %>stylesheets/',
                    src: '{,*/}*.css',
                    dest: '.tmp/<% if (!noAppFramework) { %>app/<% } %>stylesheets/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        'bower-install': {
            app: {
                html: '<%%= yeoman.app %>/index.html',
                ignorePath: '<%%= yeoman.app %>/'
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [<% if (noAppFramework) { %>
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',<% } else { %>
                        '<%%= yeoman.dist %>/app/{,*/}.*.js',<% } %>
                        '<%%= yeoman.dist %>/<% if (!noAppFramework) { %>app/<% } %>stylesheets/{,*/}*.css',
                        '<%%= yeoman.dist %>/<% if (!noAppFramework) { %>app/<% } %>images/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%%= yeoman.dist %>/<% if (!noAppFramework) { %>app/<% } %>stylesheets/fonts/{,*/}*.*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: '<%%= yeoman.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/<% if (!noAppFramework) { %>app/<% } %>stylesheets/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/<% if (!noAppFramework) { %>app/<% } %>images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%%= yeoman.dist %>/<% if (!noAppFramework) { %>app/<% } %>images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/<% if (!noAppFramework) { %>app/<% } %>images',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/<% if (!noAppFramework) { %>app/<% } %>images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%%= yeoman.dist %>/stylesheets/main.css': [
        //                 '.tmp/stylesheets/{,*/}*.css',
        //                 '<%%= yeoman.app %>/stylesheets/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%%= yeoman.dist %>/scripts/scripts.js': [
        //                 '<%%= yeoman.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '<% if (!noAppFramework) { %>app/<% } %>images/{,*/}*.webp',
                        '{,*/}*.html',
                        '<% if (!noAppFramework) { %>app/<% } %>stylesheets/fonts/{,*/}*.*'<% if (includeBootstrap) { %>,
                        '<% if (!noAppFramework) { %>app/<% } %>bower_components/' + (this.includeCompass ? 'sass-' : '') + 'bootstrap/' + (this.includeCompass ? 'fonts/' : 'dist/fonts/') +'*.*'<% } %>
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/<% if (!noAppFramework) { %>app/<% } %>stylesheets',
                dest: '.tmp/<% if (!noAppFramework) { %>app/<% } %>stylesheets/',
                src: '{,*/}*.css'
            }
        },
        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [<% if (includeCompass) { %>
                'compass:server',<% } if (coffee) { %>
                'coffee:dist',<% } %>
                'copy:styles'
            ],
            test: [<% if (coffee) { %>
                'coffee',<% } %>
                'copy:styles'
            ],
            dist: [<% if (coffee) { %>
                'coffee',<% } if (includeCompass) { %>
                'compass',<% } %>
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },
        exec: {
            virtual_box: {
                command: 'VBoxManage sharedfolder remove "2014_Smart_TV_Emulator_5_0" --name "Apps" && VBoxManage sharedfolder add "2014_Smart_TV_Emulator_5_0" --name "Apps" --hostpath "$(pwd)" --automount && VBoxManage startvm "2014_Smart_TV_Emulator_5_0" &'
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'exec:virtual_box',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', function(target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer',
            ]);
        }

        grunt.task.run([
            'connect:test',<% if (testFramework === 'mocha') { %>
            'mocha'<% } else if (testFramework === 'jasmine') { %>
            'jasmine'<% } %>
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
