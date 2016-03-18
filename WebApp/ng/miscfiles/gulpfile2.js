var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var watchify = require('watchify');

// Static server
gulp.task('default', function(){
    gutil.log('no default task');
})

//gulp.task('default', ['scripts', 'browser-sync'])

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});


gulp.task('scripts', function () {
    return bundle(browserify('./svcc/main.js'));
});

function bundle(bundler) {
    return bundler.bundle()
        .on('error', function (e) {
            gutil.log(e);
        })
        .pipe(source('./svcc/app.js'))
        .pipe(gulp.dest('./dist/app.js'));
}



