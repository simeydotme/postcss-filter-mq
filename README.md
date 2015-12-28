# PostCSS Filter Media Queries

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.png">

> Return a __filtered sub-set of css media queries__, useful for creating stylesheets
> for specific media queries (print, desktop, mobile).

For use with [__PostCSS__](https://github.com/postcss/postcss/) or [__gulp-postcss__](https://github.com/postcss/gulp-postcss).

---
[![ will it build!? ](https://travis-ci.org/simeydotme/postcss-filter-mq.svg?branch=master)](https://travis-ci.org/simeydotme/postcss-filter-mq) [![ dependencies ](https://david-dm.org/simeydotme/postcss-filter-mq.svg)](https://david-dm.org/simeydotme/postcss-filter-mq)

## Why?

Your mobile users __shouldn't have to download extraneous css__. It's
a waste of their bandwidth. Use this PostCSS plugin to __make your page load faster__ for them,
and decrease their frustration. Also ease your bandwidth.

Assuming a mobile-first coding style, turn code like this:
```css
/* main.css */
.container { background: turquoise; }

@media screen and (min-width: 40em) {
    .container { background: grey; }
}

@media screen and (min-width: 64em) {
    .container { background: white; }
}
```

in to code like this:

```css
/* mobile-and-up.css
    - serve to all users */

.container { background: turquoise; }
```

```css
/* desktop.css
    - serve to desktop users only */

@media screen and (min-width: 40em) {
    .container { background: grey; }
}
@media screen and (min-width: 64em) {
    .container { background: white; }
}
```

or ideally *if your server can detect mobile devices*, this:
```css
/* mobile-only.css
    - serve to mobile users only */

.container { background: turquoise; }
```

```css
/* all.css
    - serve to desktop users only */

.container { background: turquoise; }

@media screen and (min-width: 40em) {
    .container { background: grey; }
}

@media screen and (min-width: 64em) {
    .container { background: white; }
}
```

## How?
### PostCSS

Install `postcss` and `postcss-filter-mq` to your project;

```bash
$ npm install --save-dev postcss postcss-filter-mq
```

Given that you
[have followed the steps to get PostCSS running](https://github.com/postcss/postcss/#js-api)
in your javascript environment, you should have a file that looks
somewhat similar to this:

```js
var postcss = require("postcss"),
    filtermq = require("postcss-filter-mq");

postcss([ filtermq ])
    .process(css, { from: "src/input.css", to: "dist/output.css" })
    .then(function (result) {
        fs.writeFileSync("dist/output.css", result.css);
        if ( result.map ) fs.writeFileSync("dist/output.css.map", result.map);
    });
```

depending on your needs and file-structure, there will be differences ofcourse.
*Please refer to https://github.com/postcss/postcss/#js-api for any help getting
PostCSS running in your Node env.*

### Gulp

Install `gulp-postcss` and `postcss-filter-mq` to your project:

```bash
$ npm install --save-dev gulp-postcss postcss-filter-mq
```

Then create a task to filter your media queries:

```js
var gulp = require("gulp"),
    rename = require("gulp-rename"),
    postcss = require("gulp-postcss"),
    filtermq = require("postcss-filter-mq");

gulp.task( "css:mq", function () {

    gulp.src("src/input.css")
        .pipe( postcss([ filtermq ]) )
        .pipe( rename( "output.css" ) )
        .pipe( gulp.dest("dist/") );

});
```

### Grunt

It's also possible to use with Grunt, but you'll have to [figure that
out using the guide on their Github repo](https://github.com/nDmitry/grunt-postcss).








## Options

By default `postcss-filter-mq` will __filter all media queries__,
this is not usually very useful, and so you'll want to pass options
for __controlling which media queries are filtered__ and how.

The default, configurable options are:
```js
var options = {
    regex: /.*/i,           // decides the queries to filter
    invert: false,          // inverts the regex filter result
    keepBaseRules: false    // keep the non-media css rules
};

/*
 * then use in your environment like:
 *     postcss([ filtermq( options ) ])
 */
```









## Examples
Check out [the OPTIONS.md file](docs/OPTIONS.md) for a more in-depth look at how the options work,
or [refer to the EXAMPLES.md file](docs/EXAMPLES.md) for advanced examples on how to use this
plugin.



## Changelog
Please [refer to the release page](https://github.com/simeydotme/postcss-filter-mq/releases) for
the full release history / changelog.



## License
Please [refer to the LICENSE file](LICENSE.md) for distribution info.
