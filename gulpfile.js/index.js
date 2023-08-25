'use strict'
const {src, dest, series, parallel, watch} = require('gulp');
const fileInclude = require('gulp-file-include');
const gulpSass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const minify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require('gulp-rename');




function minifyJS(){
    return src('./src/js/**/*.js')
    .pipe(concat("main.js"))
    .pipe(minify())
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(dest('./dist/js/'))
}
function htmlInclude(){
    return src('./src/*.html')
    .pipe(fileInclude())
    .pipe(dest('./dist/'));
}

function scssCompiler(){
    return src('./src/scss/*.scss')
    .pipe(gulpSass())
    .pipe(dest('./dist/css/'))
}
function browserSyn(){
    browserSync.init({
        server: { 
            baseDir: "./dist/"
        }
    });
}

function browserReload(cb){
    browserSync.reload();
    cb();
}

function watchTask(){
    watch('/src/img/**/*', series(processImg, browserReload)),
    watch('./src/**/*.html', series(htmlInclude, browserReload)),
    watch('./src/**/*.scss', series(scssCompiler, browserReload))
    watch('./src/js/**/*.js', series(minifyJS, browserReload));
}

  exports.default = series(
    processImg,
    htmlInclude,
    scssCompiler,
    minifyJS,
    parallel(browserSyn, watchTask)
)
    
  exports.fileInclude = htmlInclude;
  exports.scssCompiler = scssCompiler;
  exports.browserSync = browserSyn;
  exports.watchTask = watchTask;
