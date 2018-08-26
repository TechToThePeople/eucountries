var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
const rename= require('gulp-rename');
const inject = require('gulp-inject');

const iso="be,bg,cz,dk,de,ee,ie,el,es,fr,hr,it,cy,lv,lt,lu,hu,mt,nl,at,pl,pt,ro,si,sk,fi,se,uk";

gulp.task('init', function(){
  return gulp.src(["node_modules/d3/dist/d3.min.js"])
  .pipe(gulp.dest("./dist/js"));
});

gulp.task('copy', function () {
  var files=[];
  iso.split(",").map((c)=>{ files.push("node_modules/flag-icon-css/flags/4x3/"+c+".svg")});
  return gulp.src(files)
  .pipe(gulp.dest('./svg/country'));
});


gulp.task('html', function() {
  return gulp.src('src/index.html')
  .pipe(inject(gulp.src(['svg/eu-flags.svg']),
   {starttag: '<!-- inject:{{path}} -->',
    relative: true,
    transform: function (filePath, file) {
      console.log(filePath);
      return file.contents.toString('utf8')}
   }))
  .pipe(gulp.dest('.'));
});

gulp.task('svg', function () {
  var country="Belgium,Bulgaria,Croatia,Cyprus,Czech Republic,Denmark,Estonia,Finland,France,Germany,Greece,Hungary,Ireland,Italy,Latvia,Lithuania,Luxembourg,Malta,Netherlands,Poland,Portugal,Romania,Slovakia,Slovenia,Spain,Sweden,United Kingdom,Austria";

  var files=[];
  iso.split(",").map((c)=>{ files.push("node_modules/flag-icon-css/flags/4x3/"+c+".svg")});
    return gulp
        .src(files)
        .pipe(rename({prefix: 'flag-'}))
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [
                  {
                removeDoctype: true
            }, {
                removeComments: true
            }, {
                cleanupNumericValues: {
                    floatPrecision: 2
                }
            },{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(rename("eu-flags.svg"))
        .pipe(gulp.dest('svg'));
});

gulp.task('default', ['svg','copy','html']);

