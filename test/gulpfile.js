var gulp = require("gulp"),
    rename = require("gulp-rename"),
    postcss = require("gulp-postcss"),
    filtermq = require("../index.js");

gulp.task( "default", ["css"] );
gulp.task( "css", ["css:print-only", "css:mobile-only", "css:all-no-print"] );

gulp.task("css:print-only", function () {

    var options = {
        regex: /print/i
    };

    gulp.src("gulp-fixture.css")
        .pipe( postcss([ filtermq(options) ]) )
        .pipe( rename( "print-only.css" ) )
        .pipe( gulp.dest("gulp-test") );

});

gulp.task("css:mobile-only", function () {

    var options = {
        regex: /max-width(\s)*:(\s)*39\.[\d]*em/i,
        keepBaseRules: true
    };

    gulp.src("gulp-fixture.css")
        .pipe( postcss([ filtermq(options) ]) )
        .pipe( rename( "mobile-only.css" ) )
        .pipe( gulp.dest("gulp-test") );

});

gulp.task("css:all-no-print", function () {

    var options = {
        regex: /print/i,
        keepBaseRules: true,
        invert: true
    };

    gulp.src("gulp-fixture.css")
        .pipe( postcss([ filtermq(options) ]) )
        .pipe( rename( "all-no-print.css" ) )
        .pipe( gulp.dest("gulp-test") );

});
