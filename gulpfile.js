var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function() {
  gulp.src("./src/*.html")
  .pipe(gulp.dest("./dest/"))
});

gulp.task('image', function() {
  gulp.src("./src/img/*")
  .pipe(gulp.dest("./dest/img"))
});

gulp.task('sass', function() {
  return gulp.src("./src/sass/style.scss")
    .pipe(sass())
	.pipe(autoprefixer())
    .pipe(gulp.dest("./dest/css"))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['html', 'sass', 'image'], function() {

  browserSync.init({
    server: './dest/'
  });
  
//  gulp.watch("./dest/img/*", ['image']);
  gulp.watch("./src/sass/**/*.scss", ['sass']);
  gulp.watch("./src/*.html", ['html']).on('change', reload);
});

gulp.task('default', ['serve']);
