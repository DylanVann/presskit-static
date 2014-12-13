module.exports = function(grunt) {

  var globalConfig = {
    src: '_presskit',
    dest: 'presskit',
  };

  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),

    // Local server.
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          base: '<%= globalConfig.dest %>/',
          livereload: true,
        },
      },
    },

    // Watch for changes.
    watch: {
      dev: {
        files: ['**/*', '!<%= globalConfig.dest %>/**', '!**/node_modules/**'],
        tasks: ['compile-dev'],
        options: {
          interupt: true,
          atBegin: true,
          livereload: true,
        },
      },
      prod: {
        files: ['**/*', '!<%= globalConfig.dest %>/**', '!**/node_modules/**'],
        tasks: ['compile-prod'],
        options: {
          interupt: true,
          atBegin: true,
          livereload: true,
        },
      },
    },

    // -------------------------------------
    // CSS
    // -------------------------------------

    // Compile sass to css.
    sass: {
      dev: {
        options: {
          style: 'nested',
          lineNumbers: true,
          // Only compile changed files.
          update: true,
        },
        files: [{
          expand: true,
          cwd: '<%= globalConfig.src %>/',
          dest: '<%= globalConfig.dest %>/',
          src: '**/*{.sass, .scss}',
          ext: '.css',
        }],
      },
      prod: {
        options: {
          style: 'compressed',
        },
        files: [{
          expand: true,
          cwd: '<%= globalConfig.src %>',
          dest: '<%= globalConfig.dest %>',
          src: '**/*.sass',
          ext: '.css',
        }],
      },
    },

    // Autoprefixer - Write CSS normally, without mixins.
    // Autoprefix all css in dest.
    autoprefixer: {
      all: {
        files: [{
          expand: true,
          cwd: '<%= globalConfig.src %>/',
          dest: '<%= globalConfig.dest %>/',
          src: '**/*.css',
        }],
      },
    },

    // -------------------------------------
    // Images
    // -------------------------------------

    // Image min. Minify all images in dest.
    imagemin: {
      all: {
        files: [{
          expand: true,
          cwd: '<%= globalConfig.dest %>/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= globalConfig.dest %>/',
        }],
      },
    },

    // Copy images from src to dest.
    copy: {
      images: {
        files: [{
          expand: true,
          cwd: '<%= globalConfig.src %>/',
          src: ['**/*.{png,jpg,gif,txt}'],
          dest: '<%= globalConfig.dest %>/',
        }],
      },
    },

    // Used for the dev task. Only copies changed images from src to dest.
    sync: {
      images: {
        files: [{
          expand: true,
          cwd: '<%= globalConfig.src %>/',
          src: ['**/*.{png,jpg,gif,txt}'],
          dest: '<%= globalConfig.dest %>/',
        }],
      },
    },

    // -------------------------------------
    // Zip
    // -------------------------------------

    // Create 'Game Name Presskit.zip' out of media folder in dest.
    // Files in dest are compressed using imagemin.
    compress: {
      presskit: {
        options: {
          archive: '<%= globalConfig.dest %>/<%= globalConfig.data.title %>\ Presskit.zip',
          mode: 'zip',
        },
        files: [{
          src: '<%= globalConfig.dest %>/media/*',
          dest: '<%= globalConfig.dest %>/',
          filter: 'isFile',
        }],
      },
    },

    // -------------------------------------
    // Javascript
    // -------------------------------------

    uglify: {
      javascript: {
        files: {
          '<%= globalConfig.dest %>/js/app.min.js': ['<%= globalConfig.src %>/js/app.js'],
        },
      },
    },

    // -------------------------------------
    // HTML
    // -------------------------------------

    // Convert jade to html.
    jade: {
      all: {
        options: {
          data: {
            data: grunt.file.readYAML('data.yml'),
            markdown: require('markdown').markdown,
          },
        },
        files: [{
          expand: true,
          cwd: '<%= globalConfig.src %>/',
          src: ['index.jade'],
          dest: '<%= globalConfig.dest %>/',
          ext: '.html',
        }],
      },
    },

    // Prettify html in dest.
    prettify: {
      all: {
        expand: true,
        cwd: '<%= globalConfig.dest %>/',
        src: '**/*.html',
        dest: '<%= globalConfig.dest %>/'
      },
    },

    // Strip comments from html in dest.
    htmlmin: {
      all: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: [{
          expand: true,
          cwd: '<%= globalConfig.dest %>/',
          src: '**/*.html',
          dest: '<%= globalConfig.dest %>/'
        }],
      },
    },

  });

  // Load all tasks in packages.json beginning with grunt.
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['compile-prod']);

  grunt.registerTask('dev', [
    'compile-dev',
    'connect',
    'watch:dev',
  ]);

  grunt.registerTask('prod', [
    'compile-prod',
    'connect',
    'watch:prod',
  ]);

  grunt.registerTask('compile-dev', [
    //CSS
    'sass:dev',
    //Images
    'sync:images',
    //HTML
    'jade',
    'prettify',
    //JS
    'uglify',
  ]);

  grunt.registerTask('compile-prod', [
    //CSS
    'sass:prod',
    'autoprefixer',
    //Images
    'copy:images',
    'imagemin',
    //HTML
    'jade',
    'htmlmin',
    'prettify',
    //JS
    'uglify',
    //Zip file.
    'compress',
  ]);

};