/* 
In this file we define our tasks
*/

var gulp = require("gulp");
// var $ = require("gulp-load-plugins");
    // load-plugins not enough benefit to use IMO.
var babel = require("gulp-babel");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// gulp.task("default", (callback) => {    
//     console.log("Ehllo Gulp!");
//     setTimeout(callback, 1000);
// });

// Register devStyles as a task
    // maps dev:styles command to devStyles function.
gulp.task("dev:styles", devStyles);
gulp.task("dev:scripts", devScripts);


// Combine/Compose Gulp tasks with gulp.parallel();
    // Asynchronous process Everything runs at same time.
    // This is more performant and in line with Node Practice.
// gulp.task("default", gulp.parallel(clean, devStyles, devScripts));

// Combine/Compose Gulp tasks with gulp.parallel() and gulp.series();
    // Best of both worlds
    // Specify what should happen first, if anything.
gulp.task('default', 
    gulp.series(
        clean, 
        gulp.parallel(
            "dev:styles", // Can optionally use registered task name as param. 
            devScripts
            ),
        publish    
    ));

function devStyles() {
    return gulp
    // .src("./src/styles/site.scss")
    .src("./src/styles/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ["last 20 versions"]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/styles"));
}

function devScripts () {
    return gulp
    // .src(["./src/scripts/application.js", "./src/scripts/utility.js"])
    .src("./src/scripts/**/*.js") // Can use glob pattern instead of specifying files.
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/scripts"));
}

function clean(callback) {
    setTimeout(() => {
        console.log("CLEANED");
        // Calling callback() to notify gulp task has ended.
        callback();
    }, 1000);
}

function publish (callback) {
    setTimeout(function () {
        console.log("PUBLISHED");
        // Calling callback() to notify gulp task has ended.
        callback();
    }, 1000);
}