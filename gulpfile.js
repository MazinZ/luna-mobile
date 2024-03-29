var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var build = 'www/build/';

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['js','sass','customsass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(build))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(build))
    .on('end', done);
});

gulp.task('customsass', function() {
    return gulp.src(['www/scss/**/*.scss', 'www/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(build));
});

gulp.task('js', function() {
    return gulp.src(['www/js/*.js', 'www/js/**/*.js', 'www/js/**/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest(build));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(['www/js/*.js', 'www/js/**/*.js', 'www/js/**/**/*.js'], ['js']);
  gulp.watch(['www/scss/**/*', 'www/scss/*'], ['customsass']);

});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
