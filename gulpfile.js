var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin');

gulp.task('scriptMain', function() {
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(rename('perfmatters.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('scriptViews', function() {
	gulp.src('views/js/*.js')
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('views/js'));
});

gulp.task('stylesMain', function() {
	gulp.src('css/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('css/minCSS'));
});

gulp.task('stylesViews', function() {
	gulp.src('views/css/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('views/css/minCSS'));
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
	gulp.watch('js/*.js', ['scriptMain']);
	gulp.watch('views/js/*.js', ['scriptViews']);
	gulp.watch('css/*.css', ['stylesMain']);
	gulp.watch('views/css/*.css', ['stylesViews']);
});

gulp.task('default', ['scriptMain', 'scriptViews', 'stylesMain', 'stylesViews', 'watch']);