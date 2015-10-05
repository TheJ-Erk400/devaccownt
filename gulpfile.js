var browserify = require('browserify');
var streamify = require('gulp-streamify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var argv = require('yargs').argv;
var gzip = require('gulp-gzip');
var gulp = require('gulp');

/*
	build-react
	- bundles React componenents
	- converts JSX -> pure React
	- minifies JavaScript
	@params
	- file // React "page" component name, no file extension
*/
gulp.task('build-react', function() {
	// Add JSX transformer to Browserify
	var b = browserify();
	b.transform(reactify);
	b.add('./components/' + argv.file + '.jsx');
	
	// Bundle React components and minify JS
	return b.bundle()
		.pipe(source(argv.file + '.js'))
		.pipe(streamify(uglify({
			mangle: false,
			compress: {
				unused: false
			}
		}).on('error', gutil.log)))
		//.pipe(gzip({append: false}))
		.pipe(gulp.dest('./public/js/react/'));
});