// when files change, watchify runs
// need to have web server running (browser-sync will do here but is not sensing changes)

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

gulp.task('watch', function () {
    var watcher = watchify(browserify('./svcc/main.js',watchify.args));
    bundle(watcher);

    watcher.on('update',function() {
        bundle(watcher);
    });

    watcher.on('log',gutil.log);
});


function bundle(bundler) {
    return bundler.bundle()
        .on('error', function (e) {
            gutil.log(e);
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'));
}



