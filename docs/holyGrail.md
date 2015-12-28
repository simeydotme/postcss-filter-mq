## Holy Grail
Here's a real-world example; *(and the main reason for creating this
plugin)* we want to __separate all the base css__ out in
to one file -- loaded only on mobile devices with server-side detection --
and save __all the base css and @media queries__ in to another file -- loaded only
for non-mobile devices.


### CSS Input
```css
/* input.css
 *    - actually, this was produced by sass
 *    - this is a sub-set of the zurb foundation 6 code
 */


.hide {
  display: none !important; }

.invisible {
  visibility: hidden; }

@media screen and (min-width: 0em) and (max-width: 39.9375em) {
  .hide-for-small-only {
    display: none !important; } }

@media screen and (max-width: 0em), screen and (min-width: 40em) {
  .show-for-small-only {
    display: none !important; } }

@media screen and (min-width: 40em) {
  .hide-for-medium {
    display: none !important; } }

@media screen and (max-width: 39.9375em) {
  .show-for-medium {
    display: none !important; } }

@media screen and (min-width: 40em) and (max-width: 63.9375em) {
  .hide-for-medium-only {
    display: none !important; } }

@media screen and (max-width: 39.9375em), screen and (min-width: 64em) {
  .show-for-medium-only {
    display: none !important; } }

@media screen and (min-width: 64em) {
  .hide-for-large {
    display: none !important; } }

@media screen and (max-width: 63.9375em) {
  .show-for-large {
    display: none !important; } }

@media screen and (min-width: 64em) and (max-width: 74.9375em) {
  .hide-for-large-only {
    display: none !important; } }

@media screen and (max-width: 63.9375em), screen and (min-width: 75em) {
  .show-for-large-only {
    display: none !important; } }


.show-for-print {
  display: none !important; }

@media print {
  * {
    background: transparent !important;
    color: black !important;
    box-shadow: none !important;
    text-shadow: none !important; }
  .show-for-print {
    display: block !important; }
  .hide-for-print {
    display: none !important; }
}
```






### Gulpfile.js
```js
var gulp = require("gulp"),
    rename = require("gulp-rename"),
    postcss = require("gulp-postcss"),
    filtermq = require("../index.js");

gulp.task( "default", ["css"] );
gulp.task( "css", ["css:mobile", "css:all"] );


gulp.task("css:mobile", function () {
    
    /* we want to keep only the print css
      and css which matches out max-width query */

    var options = {
        regex: /(print|max-width(\s)*:(\s)*39\.[\d]*em)/i,
        keepBaseRules: true
    };

    gulp.src("input.css")
        .pipe( postcss([ filtermq(options) ]) )
        .pipe( rename( "mobile.css" ) )
        .pipe( gulp.dest("dist/") );

});

gulp.task("css:all", function () {
    
    /* no need to run the plugin if we're not
      filtering anything */

    gulp.src("input.css")
        .pipe( rename( "all.css" ) )
        .pipe( gulp.dest("dist/") );

});
```







### CSS Outputs

#### mobile.css
```css
/* mobile.css
 *    - regex: /max-width(\s)*:(\s)*39\.[\d]*em/i,
 *    - keepBaseRules: true
 */

.hide {
  display: none !important; }

.invisible {
  visibility: hidden; }

@media screen and (min-width: 0em) and (max-width: 39.9375em) {
  .hide-for-small-only {
    display: none !important; } }

@media screen and (max-width: 39.9375em) {
  .show-for-medium {
    display: none !important; } }

@media screen and (max-width: 39.9375em), screen and (min-width: 64em) {
  .show-for-medium-only {
    display: none !important; } }



.show-for-print {
  display: none !important; }
```



#### all.css
```css
/* all-no-print.css
 *    - regex: /print/i,
 *    - keepBaseRules: true,
 *    - invert: true
 */

.hide {
  display: none !important; }

.invisible {
  visibility: hidden; }

@media screen and (min-width: 0em) and (max-width: 39.9375em) {
  .hide-for-small-only {
    display: none !important; } }

@media screen and (max-width: 0em), screen and (min-width: 40em) {
  .show-for-small-only {
    display: none !important; } }

@media screen and (min-width: 40em) {
  .hide-for-medium {
    display: none !important; } }

@media screen and (max-width: 39.9375em) {
  .show-for-medium {
    display: none !important; } }

@media screen and (min-width: 40em) and (max-width: 63.9375em) {
  .hide-for-medium-only {
    display: none !important; } }

@media screen and (max-width: 39.9375em), screen and (min-width: 64em) {
  .show-for-medium-only {
    display: none !important; } }

@media screen and (min-width: 64em) {
  .hide-for-large {
    display: none !important; } }

@media screen and (max-width: 63.9375em) {
  .show-for-large {
    display: none !important; } }

@media screen and (min-width: 64em) and (max-width: 74.9375em) {
  .hide-for-large-only {
    display: none !important; } }

@media screen and (max-width: 63.9375em), screen and (min-width: 75em) {
  .show-for-large-only {
    display: none !important; } }



.show-for-print {
  display: none !important; }

@media print {
  * {
    background: transparent !important;
    color: black !important;
    box-shadow: none !important;
    text-shadow: none !important; }
  .show-for-print {
    display: block !important; }
  .hide-for-print {
    display: none !important; }
}

```


### HTML Usage

```html
<html>
    <head>

        <!-- Server only sends mobile.css to mobile devices,
            this is a cut-down file which should load faster with
            just one single http request -->

        <link href="mobile.css" />

        <!-- Server only sends all-no-print.css to non-mobile devices,
            this file has all mobile + desktop css and requires
            just one single http request -->

        <link href="all.css" />

    </head>
    <body>

    </body>
</html>
```
