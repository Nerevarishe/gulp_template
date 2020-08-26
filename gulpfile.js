const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

function compileSass() {
  return gulp
    .src("./src/assets/scss/styles.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./src/assets/css"))
    .pipe(browserSync.stream());
}

function watch(done) {
  compileSass();
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
