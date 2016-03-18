var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('scripts', function () {
    browserify('./svcc/main.js')
        .bundle()
        .on('error', function (e) {
            gutil.log(e);
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'))
});



gulp.task('default', function() {
    console.log('default');
});
