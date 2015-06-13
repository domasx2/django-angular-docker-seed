var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    jshint = require('gulp-jshint'),
    jade = require('gulp-jade'),
    ngHtml2Js = require("gulp-ng-html2js"),
    browserify = require('browserify'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require("gulp-rename"),
    mainBowerFiles = require('main-bower-files'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber');


var NG_MODULE_NAME = 'myapp';

var PATHS = {
    STYL: 'src/stylesheets/style.styl',
    STYL_ALL: 'src/stylesheets/**/*.styl',
    JS: 'src/app/**/*.js',
    JSMAIN: 'src/app/index.js',
    JADE: 'src/app/**/*.jade'
};


//delete everything from dist before rebuild
gulp.task('cleanDist', function(cb) {
    del(['dist/*'], cb);
});

//compile stylus to css
gulp.task('stylus', function () {
    return gulp.src(PATHS.STYL)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

//validate using jshint
gulp.task('jshint', function () {
    return gulp.src(PATHS.JS)
        .pipe(jshint({
            browser: true,
            devel: true,
            noempty: false,
            plusplus: false,
            globals: ['$', 'jQuery', 'angular', 'require']
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

//compile templates
gulp.task('templates', function () {
    return gulp.src(PATHS.JADE)
        .pipe(plumber())
        .pipe(jade())
        .pipe(ngHtml2Js({
            moduleName: NG_MODULE_NAME
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
}); 

//compile angular app
gulp.task('javascript', ['jshint'], function () {

    browserify({entries: PATHS.JSMAIN})
    .bundle().on('error', function (err) {
        console.error(err.toString());
        this.emit("end");
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());
});

//contact bower javascript to a single file
gulp.task('bower', function () {
    return gulp.src(mainBowerFiles('**/*\.js'))
        .pipe(sourcemaps.init())
        .pipe(concat('bower.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./dist/'));
});

//copy bower css & other files
gulp.task('bower-other', function () {
    return gulp.src(mainBowerFiles({
        filter: function(file) {
            return file.substring(file.length -2) !== 'js';
        },
    }), {base: 'bower_components'})
    .pipe(gulp.dest('./dist/bower_components/'));
});

gulp.task('copy-fonts', function () {
    return gulp.src('fonts/**/*', {base: 'fonts/'})
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('copy-images', function () {
    return gulp.src('images/**/*', {base: 'images/'})
        .pipe(gulp.dest('./dist/images/'));
});

//uglify sources
gulp.task('uglify',  function () {
    return gulp.src('./dist/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./dist/'));
});

//watch sources and rebuild
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(PATHS.STYL_ALL, ['stylus']);
    gulp.watch(PATHS.JS, ['javascript']);
    gulp.watch(PATHS.JADE, ['templates']);
});

gulp.task('build', function (cb) {
    runSequence('cleanDist', ['templates', 'bower', 'bower-other', 'copy-fonts', 'copy-images', 'stylus', 'javascript'], cb);
});

gulp.task('build-prod', function (cb) {
    runSequence('build', 'uglify', cb);
});

gulp.task('develop', function (cb) {
    runSequence('build', 'watch', cb);
});

gulp.task('default', ['build']);