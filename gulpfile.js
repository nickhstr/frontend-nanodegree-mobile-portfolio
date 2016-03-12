var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin');

gulp.task('scripts', function() {
	gulp.src('js/*.js')
		.pipe(uglify())
	.pipe(rename('perfmatters.min.js'))
		.pipe(gulp.dest('js/'));
});

gulp.task('styles', function() {
	gulp.src('css/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('css/minCSS'));
});

gulp.task('images', function() {
	gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('img'));
	gulp.src('views/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('views/images'));
});

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('css/*.css', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);