const path = require('path');
const { src, dest, watch, task, series } = require('gulp');
const pegjs = require('gulp-pegjs');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const pegjsSrc = './src/*.pegjs';
const entry = './src/index.js';

function buildPEG() {
  return src([pegjsSrc])
    .pipe(pegjs({ format: 'umd', exportVar: 'JSONParser' }))
    .pipe(rename((path) => path.basename += '-parser'))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'))
    .pipe(uglify())
    .pipe(rename((path) => path.basename += '.min'))
    .pipe(dest('dist'))
}

function buildJs() {
  return src([entry])
    .pipe(babel())
    .pipe(dest('lib'));
}


exports.build = series(buildPEG, buildJs);

exports.watch = () => {
  watch([pegjsSrc], { ignoreInitial: false }, buildPEG);
  watch(['./src/*.js'], { ignoreInitial: false }, buildJs);
}



