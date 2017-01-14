var config = require('./build_utils/gulp-config');
var gulp = require("gulp");
// var $ = require("gulp-load-plugins");
var babel = require("gulp-babel");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
/* _______________________
PRODUCTION REQUIRES 
*/
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

/* _______________________
REGISTER TASKS 
*/
gulp.task("dev:html", devHTML);
gulp.task("dev:styles", devStyles);
gulp.task("dev:scripts", devScripts);
gulp.task("prod:styles", prodStyles);
gulp.task("prod:scripts", prodScripts);

gulp.task('dev', gulp.parallel( "dev:styles", devScripts));
gulp.task('prod', gulp.parallel("prod:styles","prod:scripts"));
// Run dev first and then start watching.
gulp.task('dev:watch', gulp.series("dev", devWatch));

/* _______________________
DEV TASK FUNCTIONS 
*/
// Register devStyles as a task
    // maps dev:styles command to devStyles function.

function devHTML() {
    return gulp 
    .src(config.html.src)
    .pipe(livereload());
}

function devStyles() {
    return gulp
    // .src("./src/styles/site.scss")
    .src(config.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.styles.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.styles.dest))
    .pipe(livereload());
}

function devScripts () {
    return gulp
    // .src(["./src/scripts/application.js", "./src/scripts/utility.js"])
    .src(config.scripts.src) // Can use glob pattern instead of specifying files.
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scripts.dest));
}

// Only need watch in development 
function devWatch() {
    livereload.listen();
    gulp.watch(config.html.distDir, gulp.series("dev:html"));
    gulp.watch(config.styles.srcDir, gulp.series("dev:styles"));
    gulp.watch(config.scripts.src, gulp.series("dev:scripts"));
}

/* _______________________
PRODUCTION TASK FUNCTIONS 
*/
// Combine/Compose Gulp tasks with gulp.parallel() and gulp.series();
    // Specify what should happen first, if anything.

function prodStyles() {
    return gulp
    // .src("./src/styles/site.scss")
    .src(config.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(config.styles.autoprefixer))
    .pipe(minifyCss())
    .pipe(gulp.dest(config.styles.dest));
}

function prodScripts () {
    return gulp
    // .src(["./src/scripts/application.js", "./src/scripts/utility.js"])
    .src(config.scripts.src) // Can use glob pattern instead of specifying files.
    .pipe(babel())
    .pipe(concat(config.scripts.bundle))
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.dest));
}

