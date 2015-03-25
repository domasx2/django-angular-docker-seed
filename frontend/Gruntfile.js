module.exports = function(grunt) {

  grunt.initConfig({

    //remove build artifacts from dist
    clean: {
      dist: ['dist/*'],
      templates: ['dist/templates']
    },

    //compile html templates into a javascript file that preloads them to ng template cache
    ngtemplates:  {
      myapp: {
        cwd: 'dist/templates',
        src: '**/*.html',
        dest: 'dist/templates.js'
      }
    },

    //compile jade templates to html templates
    jade: {
      compile: {
        files: [{
          expand: true,
          cwd: 'src/app',
          src: ['**/*.jade'],
          dest: 'dist/templates',
          ext: '.html'
        }]
      }
    },

    //compile css
    stylus: {
      compile: {
        files: {
          'dist/style.css': 'src/stylesheets/style.styl'
        }
      }
    },

    //watch sources and recompile on change
    watch: {
      templates: {
        files: ['src/app/**/*.jade'],
        tasks: ['templates']
      },
      css: {
        files: ['src/stylesheets/**/*.styl'],
        tasks: ['stylus:compile']
      },
      javascript: {
        files: ['src/app/**/*.js'],
        tasks: ['jshint', 'javascript']
      },
      options: {
        livereload: true,
      }
    },

    //browserify angular app into a single file
    browserify: {
      dist: {
        files: {
          'dist/app.js': ['src/app/index.js']
        }
      },
      options: {
        browserifyOptions: {
          debug: true
        }
      }
    },

    ngAnnotate: {
        options: {
            singleQuotes: true,
        },
        app: {
            files: {
                'dist/app.js': ['dist/app.js']
            },
        },
    },


    //extract source maps
    exorcise: {
      bundle: {
        options: {},
        files: {
          'dist/app.map': ['dist/app.js'],
        }
      }
    },

    //copy bower components to dist
    copy: {
      bower: {
        files: [
          // includes files within path and its sub-directories 
          {expand: true, src: ['bower_components/**'], dest: 'dist/'},
        ]
      }
    },

    //concat bower deps
    bower_concat: {
      all: {
        dest: 'dist/bower.js',
        cssDest: 'dist/bower.css',
        dependencies: {
          angular: ['jquery']
        },
        exclude: ['bootstrap']
      }
    },


    //validate javascript
    jshint: {
      all: ['src/app/**/*.js'],
      options: {
        browser: true,
        devel: true,
        noempty: false,
        plusplus: true,
        globals: ['$', 'jQuery', 'angular', 'require']
      }
    }
  });

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-exorcise');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.task.registerTask('templates', ['jade:compile', 'ngtemplates:myapp', 'clean:templates']);
  grunt.task.registerTask('javascript', ['browserify:dist', 'ngAnnotate:app', 'exorcise']);

  grunt.task.registerTask('build', ['clean:dist', 'copy:bower', 'bower_concat:all', 'templates', 'stylus:compile', 'javascript']);
  grunt.task.registerTask('develop', ['build', 'watch']);
};