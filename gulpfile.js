'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
//var postcss = require('gulp-postcss');
var paths = {
    styles: {
        src: 'scss/main.scss',
        dest: 'assets/css'
    }
}
function scss() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest(paths.styles.dest));
}
exports.default = scss