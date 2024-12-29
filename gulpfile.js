const {src, dest, watch, series} = require("gulp");

const sass           = require('gulp-sass')(require('sass')),
			autoprefixer   = require("gulp-autoprefixer"),
      cleancss       = require("gulp-clean-css"),
      rename         = require("gulp-rename"), 
			terser         = require("gulp-terser");
			// webp           = require("gulp-webp");


function css() {
	return src('assets/scss/*.scss')
				 .pipe(sass())
				 .pipe(autoprefixer('last 2 versions'))
				 .pipe(cleancss())
				 .pipe(rename({suffix: '.min'}))
				 .pipe(dest('assets/css'))
}

function js() {
	return src('assets/js/main.js')
				 .pipe(terser())
				 .pipe(rename({suffix: '.min'}))
				 .pipe(dest('assets/js'))
}

// function webpImg() {
// 	return src('assets/src/img/*.{jpg,png}')
// 	       .pipe(webp())
// 				 .pipe(dest('assets/dist/img'))
// }

function whatchTask() {
	watch('assets/scss/*.scss', css);
	watch('assets/js/main.js', js);
	// watch('assets/img/*.{jpg,png}', webpImg);
}

exports.default = series(
	css,
	js,
	// webpImg,
	whatchTask
);