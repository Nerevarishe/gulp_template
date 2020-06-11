const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");

function compileSass(done) {
  gulp
    .src("./src/assets/scss/styles.scss")
    // .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("./src/assets/css"))
    .pipe(browserSync.stream());
  done();
}

function watch(done) {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });
  gulp.watch("./src/assets/scss/**/*.scss", compileSass);
  gulp.watch("./src/*.html").on("change", browserSync.reload);
  gulp.watch("./src/assets/js/**/*.js").on("change", browserSync.reload);
  done();
}

exports.sass = compileSass;
exports.default = watch;
