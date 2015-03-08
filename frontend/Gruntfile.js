module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      dist: ['dist/*'],
      templates: ['dist/templates']
    },
    ngtemplates:  {
      compile: {
        cwd: 'dist/',
        module: 'bugzez',
        src: 'templates/**/*.html',
        dest: 'dist/templates.js'
      }
    },
    jade: {
      compile: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['templates/**/*.jade'],
          dest: 'dist/',
          ext: '.html'
        }]
      }
    },
    stylus: {
      compile: {
        files: {
          'dist/style.css': 'src/stylesheets/style.styl'
        }
      }
    },
    watch: {
      templates: {
        files: ['src/templates/**/*.jade'],
        tasks: ['templates']
      },
      css: {
        files: ['src/stylesheets/**/*.styl'],
        tasks: ['stylus:compile']
      },
      javascript: {
        files: ['src/js/**/*.js'],
        tasks: ['javascript']
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/app.js': ['src/js/index.js']
        }
      },
      options: {
        browserifyOptions: {
          debug: true
        }
      }
    },
    exorcise: {
      bundle: {
        options: {},
        files: {
          'dist/app.map': ['dist/app.js'],
        }
      }
    },

    bower_concat: {
      all: {
        dest: 'dist/bower.js',
        cssDest: 'dist/bower.css',
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

  grunt.task.registerTask('templates', ['jade:compile', 'ngtemplates:compile', 'clean:templates']);
  grunt.task.registerTask('javascript', ['browserify:dist', 'exorcise']);

  grunt.task.registerTask('build', ['clean:dist', 'bower_concat:all', 'templates', 'stylus:compile', 'javascript']);
  grunt.task.registerTask('develop', ['build', 'watch']);
};