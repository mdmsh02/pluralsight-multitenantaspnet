// adding live updates with browsersync

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var gutil = require('gulp-util');


// Static server
gulp.task('default', function(){
    console.log('no default task');
})

//gulp.task('default', ['scripts', 'browser-sync'])

gulp.task('webserveronly', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('scripts', function () {
    return bundle(browserify('./svcc/main.js'));
});

gulp.task('watch', function () {
    var watcher =
        watchify(browserify('./svcc/main.js',watchify.args));
    bundle(watcher);
    watcher.on('update',function() {
        bundle(watcher);
    });
    watcher.on('update',gutil.log);

    browserSync.init({
        server: "./dist"
    });
});


function bundle(bundler) {
    return bundler.bundle()
        .on('error', function (e) {
            gutil.log(e);
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}



