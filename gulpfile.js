var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
const rename= require('gulp-rename');

gulp.task('svgstore', function () {
  var country="Belgium,Bulgaria,Croatia,Cyprus,Czech Republic,Denmark,Estonia,Finland,France,Germany,Greece,Hungary,Ireland,Italy,Latvia,Lithuania,Luxembourg,Malta,Netherlands,Poland,Portugal,Romania,Slovakia,Slovenia,Spain,Sweden,United Kingdom,Austria";
  var iso="be,bg,cz,dk,de,ee,ie,el,es,fr,hr,it,cy,lv,lt,lu,hu,mt,nl,at,pl,pt,ro,si,sk,fi,se,uk";

  var files=[];
  iso.split(",").map((c)=>{ files.push("node_modules/svg-country-flags/svg/"+c+".svg")});
    return gulp
        .src(files)
        .pipe(rename({prefix: 'flag-'}))
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(rename("eu-flags.svg"))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['svgstore']);

