var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    nano = require('gulp-cssnano'),
    rename = require('gulp-rename');

gulp.task('scss', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('nano', function () {
    return gulp.src(['./css/**/*.css', '!./css/*.min.css'])
        .pipe(sourcemaps.init())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(nano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});

gulp.task('default', function () {
    gulp.watch('./scss/**/*.scss', ['scss'], function () {
        gulp.watch('./css/**/*.css', ['nano']);
    });
})

// gulp.task('default', function () {
//     runSequence('scss', 'nano');
// })