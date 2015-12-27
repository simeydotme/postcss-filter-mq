## Examples

Here's a few examples of what can be done, using this base CSS each example
will have different outputs.

- [Unfiltered CSS](#unfiltered)
- [Print Only](#only-print)
- [Base + Print](#base--print)
- [Non-Print Only](#non-print)
- [Large Screen Only](#large-screen-only)
####
- [:trophy: Holy Grail](#holy-grail)
    - [:gem: Reference CSS](#css-input)
    - [:gem: Gulpfile](#gulpfilejs)
    - [:gem: Filtered CSS](#css-outputs)
    - [:gem: HTML Usage Example](#html-usage)


### Unfiltered
```css
/* input.css - no filtering applied */
body {
    background: #f3f3f3;
    color: #222;
}

.container {
    padding: 1em;
}

@media print {
    body {
        background: white;
        color: black;
    }
}

@media screen and (min-width: 40em) {
    .container {
        max-width: 50em;
        padding: 0;
    }
}

@media screen and (min-width: 40em) and (max-width: 64em) {
    .container {
        padding: 1em;
    }
}

@media screen and (min-width: 64em) {
    .container {
        max-width: 80em;
        padding: 1em 1em 5em;
    }
}
```







### Only Print
##### OPTIONS
```js
/* options passed to plugin */
var options = {
    regex: /print/i
}
```
##### RESULT
```css
/* output.css - keeping only print @media */
@media print {
    body {
        background: white;
        color: black;
    }
}
```





### Base + Print
##### OPTIONS
```js
/* options passed to plugin */
var options = {
    regex: /print/i,
    keepBaseRules: true
}
```
##### RESULT
```css
/* output.css - keeping non-media rules and only print @media */
body {
    background: #f3f3f3;
    color: #222;
}

.container {
    padding: 1em;
}

@media print {
    body {
        background: white;
        color: black;
    }
}
```





### Non-Print Only
##### OPTIONS
```js
/* options passed to plugin */
var options = {
    regex: /print/i,
    invert: true
}
```
##### RESULT
```css
/* output.css - all @media *except* for print */
@media screen and (min-width: 40em) {
    .container {
        max-width: 50em;
        padding: 0;
    }
}

@media screen and (min-width: 40em) and (max-width: 64em) {
    .container {
        padding: 1em;
    }
}

@media screen and (min-width: 64em) {
    .container {
        max-width: 80em;
        padding: 1em 1em 5em;
    }
}
```





### Large Screen Only
##### OPTIONS
```js
/* options passed to plugin */
var options = {
    regex: /min-width(\s)*:(\s)*64em/i
}
```
##### RESULT
```css
/* output.css - only @media for large screens */
@media screen and (min-width: 64em) {
    .container {
        max-width: 80em;
        padding: 1em 1em 5em;
    }
}
```










---

## Holy Grail
Here's a real-world example; *(and the main reason for creating this
plugin)* we want to separate all the `base` *(mobile and up)* `css` out in
to one file -- loaded only on mobile devices with server-side detection --
and save all the `base css` and `@media queries` in to another file loaded only
for non-mobile devices. Lastly we can save all the `@media print` css in to
another asyncronously loaded css file.


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
gulp.task( "css", ["css:print-only", "css:mobile-only", "css:all-no-print"] );

gulp.task("css:print-only", function () {

    var options = {
        regex: /print/i
    };

    gulp.src("input.css")
        .pipe( postcss([ filtermq(options) ]) )
        .pipe( rename( "print-only.css" ) )
        .pipe( gulp.dest("dist/") );

});

gulp.task("css:mobile-only", function () {

    var options = {
        regex: /max-width(\s)*:(\s)*39\.[\d]*em/i,
        keepBaseRules: true
    };

    gulp.src("input.css")
        .pipe( postcss([ filtermq(options) ]) )
        .pipe( rename( "mobile-only.css" ) )
        .pipe( gulp.dest("dist/") );

});

gulp.task("css:all-no-print", function () {

    var options = {
        regex: /print/i,
        keepBaseRules: true,
        invert: true
    };

    gulp.src("input.css")
        .pipe( postcss([ filtermq(options) ]) )
        .pipe( rename( "all-no-print.css" ) )
        .pipe( gulp.dest("dist/") );

});
```







### CSS Outputs


#### print-only.css
```css
/* print-only.css
 *    - regex: /print/i
 */

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



#### mobile-only.css
```css
/* mobile-only.css
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



#### all-no-print.css
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
```


### HTML Usage

```html
<html>
    <head>

        <!-- Server only sends mobile.css to mobile devices,
            this is a cut-down file which should load faster with
            just one single http request -->

        <link href="mobile-only.css" />

        <!-- Server only sends all-no-print.css to non-mobile devices,
            this file has all mobile + desktop css and requires
            just one single http request -->

        <link href="all-no-print.css" />

        <!-- Only serve print-only.css if javascript disabled,
            otherwise we load it async below -->

        <noscript>
            <link href="print-only.css" />
        </noscript>

    </head>
    <body>

        <!--  content  -->

        <!-- print style sheet loads from an async javascript method,
            we shouldn't be blocking page render for a print method which
            cannot be triggered until the page finished rendering, anway -->

        <script src="loadPrintStyle.js" async></script>

    </body>
</html>
```
