'use strict';

import gulp from 'gulp';
import server from 'gulp-webserver';
import mjml from 'gulp-mjml';
import del from 'del';

const paths = {
  src: './src',
  dist: './dist',
};

// Tasks

gulp.task('clean', (cb) => del([`${ paths.dist }/*`], cb));

gulp.task('copy', () => {
  return gulp.src([`!${ paths.src }/*.mjml`, `${ paths.src }/**`, ])
    .pipe(gulp.dest(paths.dist));
});

gulp.task('webserver', ['build'], () => {
  gulp.src(paths.dist)
    .pipe(server({
      livereload: true,
      directoryListing: {
        enable: true,
        path: 'dist',
      },
      open: true
    }));
});

gulp.task('mjml', () => {
  return gulp.src(`${ paths.src }/*.mjml`)
    .pipe(mjml())
    .pipe(gulp.dest(paths.dist))
});

gulp.task('build', ['mjml']);

gulp.task('watch', ['webserver'], () => {
  gulp.watch(`${ paths.src }/**.*`, ['clean', 'copy']);
  gulp.watch(`${ paths.src }/*.mjml`, ['mjml']);
});

gulp.task('default', ['clean', 'copy', 'watch']);