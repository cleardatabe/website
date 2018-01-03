const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const debug = require('gulp-debug');
const del = require('del');
const imagemin = require('gulp-imagemin');
const es = require('event-stream');
var nunjucks = require('gulp-nunjucks-render');

gulp.task('default', ['copy','html-templates', 'minify-css', 'imagemin']);

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html-templates', function() {
  return gulp.src('*.html')
  	.pipe(nunjucks({
		path: ['.'] // String or Array 
  	}))
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('imagemin', () =>
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

gulp.task('copy', function() {
	var ico = gulp.src([
		'android-chrome-96x96.png',
		'apple-touch-icon.png',
		'favicon-16x16.png',
		'favicon-32x32.png',
		'mstile-150x150.png',
		'favicon.ico',
		'manifest.json',
		'browserconfig.xml'		
	]).pipe(gulp.dest('dist'))
	
	var fa = gulp.src('font-awesome/**')
				.pipe(gulp.dest('dist/font-awesome'))
	
	var js = gulp.src('js/**')
				.pipe(gulp.dest('dist/js'))

	var docs = gulp.src('docs/**')
				.pipe(gulp.dest('dist/docs'))
				
	return es.concat(ico, fa, js);
});

gulp.task('clean', function() {
	return del(
		[
			'dist/**'
		]
	);
});