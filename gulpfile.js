// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask() {
	return (
		src('scss/main.scss', { sourcemaps: true })
			.pipe(sass())
			.pipe(postcss([autoprefixer()]))
			.pipe(dest('dist/css', { sourcemaps: '.' }))
	);
}

// JavaScript Task
function jsTask() {
	return src('js/script.js', { sourcemaps: true })
		.pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(terser())
		.pipe(dest('dist/js', { sourcemaps: '.' }));
}

// Browsersync
function browserSyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: 'dist',
		},
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
			},
		},
	});
	cb();
}
function browserSyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch('dist/index.html', browserSyncReload);
	watch(
		['scss/**/*.scss', 'js/**/*.js'],
		series(scssTask, jsTask, browserSyncReload)
	);
}

/* Default Gulp Task
 * Gulp Start this task (function) at start
 */
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
