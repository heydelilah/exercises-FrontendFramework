var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require("gulp-open"),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    react = require('gulp-react'),
    // var reactify = require('reactify')
    port = process.env.port || 3031;


// gulp.task('browserify', function () {
//     return gulp.src('./js/main.js')
//         .pipe(react())
//         .pipe(gulp.dest('./dist/js'));
// });
// browserify and transform JSX
gulp.task('browserify', function() {
    gulp.src('./js/main.js')
      .pipe(browserify({transform: 'reactify'}))
      .pipe(gulp.dest('./dist/js'));
});


// launch browser in a port
gulp.task('open', function(){
  var options = {
    url: 'http://localhost:' + port,
  };
  gulp.src('./index.html')
  .pipe(open('', options));
});

// live reload server
gulp.task('connect', function() {
  connect.server({
    root: '',
    port: port,
    livereload: true
  });
});

// live reload js
gulp.task('js', function () {
  gulp.src('./dist/**/*.js')
    .pipe(connect.reload());
});

// live reload html
gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

// watch files for live reload
gulp.task('watch', function() {
    gulp.watch('dist/js/*.js', ['js']);
    gulp.watch('index.html', ['html']);
    gulp.watch('js/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);