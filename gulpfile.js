'use strict'

const { src, dest, watch, series, parallel} = require('gulp');

const sass = require('gulp-sass')(require('sass'));

var paths = {
    styles: {
        src: 'scss/main.scss',
        dest: 'assets/css'
    }
}
function scss() {
    return src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(dest(paths.styles.dest));
}
exports.default = scss