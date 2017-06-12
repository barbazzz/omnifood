const gulp = require('gulp');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const del = require('del');
const rimraf = require('rimraf');
const _if = require('gulp-if');
const concat = require('gulp-concat');

const rigger = require('gulp-rigger');
const jade = require('gulp-jade');

const browserSync = require('browser-sync');
const reload = browserSync.reload;

// CSS
const sass = require('gulp-sass');
const gautoprefixer = require('gulp-autoprefixer');
const gcssnano = require('gulp-cssnano');

// PostCSS
const postcss = require('gulp-postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const cssnext = require('cssnext');
const doiuse = require('doiuse');

const maps = require('gulp-sourcemaps');


let production = process.env.NODE_ENV === 'production';

production = false;

// Write task only for
// * browser-sync and watch task
// * scss to css compile
// * soursemaps
const serverConfig = {
  server: {
    baseDir: "./build/dev"
  },
  host: 'localhost',
  port: 9000
};


gulp.task('webserver', function() {

  browserSync.init(serverConfig);

});

gulp.task('scss:build', () => {
  let processors = [
    autoprefixer({
      browsers: [
        '>1%',
        'last 2 version',
        'ie>=9'
      ],
    }),
    doiuse({
      browsers: [
        '>1%',
        'last 2 version',
        'ie>=9'
      ],
      ignore: ['rem'],
      ignoreFiles: [],
      onFeatureUsage: (usageInfo) => {
        let message = usageInfo.message;
        message = message.replace(__dirname, '');
        //gutil.log(message);
      }
    }),

  ];

  gulp.src(['src/scss/**/*.{scss,sass}'])
    .pipe(_if(!production, plumber()))
    .pipe(_if(!production, maps.init()))
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(_if(production, gcssnano()))
    .pipe(_if(!production, maps.write('./')))
    .pipe(gulp.dest('build/dev/css'))
    .pipe(reload({stream: true}))
});

gulp.task('html:build', () => {
  gulp.src(['src/*.html'])
    .pipe(rigger())
    .pipe(gulp.dest('build/dev'))
    .pipe(reload({stream: true}))
});

gulp.task('js:build', () => {
  console.log('gulp');
  gulp.src(['src/js/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/dev/js'))
    .pipe(reload({stream: true}))
});

gulp.task('images', () => {
  gulp.src('src/assets/images/*.{png,jpeg,jpg,gif}')
    .pipe(gulp.dest('build/dev/img'))
});

gulp.task('build', [
  'html:build',
  'scss:build',
  'js:build',
  'images'
]);

gulp.task('clean', () => {
  del(['./build/dev']);
});

gulp.task('watch', () => {

  watch(['src/*.html', 'src/templates/*.html'], (event, cb) => {
    gulp.start('html:build')
  });

  watch(['src/**/*.{scss,sass}'], (event, cb) => {
    gulp.start('scss:build')
  });

  watch(['src/js/**/*.js'], (event, cb) => {
    gulp.start('js:build');
  });

});



gulp.task('default', ['build', 'webserver', 'watch']);