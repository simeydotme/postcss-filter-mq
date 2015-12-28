## Options

- [regex](#regex)
- [invert](#invert)
- [keepBaseRules](#keepbaserules)

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
```


---




### Regex

```js
{ regex: /.*/i }
```

The regex option is passed as a __regular expression__ (no quote marks) value,
it will then match this regex against every media query found in the input css.
If a media query matches, it will return to the output.


#### Example

```js
{ regex: /max-width(\s)*:(\s)*1200px/ }
```

would match:

```css
@media screen and ( max-width : 1200px ) { ... }
@media ( max-width:1200px ) { ... }
```

but would __*not*__ match:

```css
@media screen and ( min-width: 1200px ) { ... }
/* ( or anything else ) */
```


__Tips__:
 - use `(\s)*` where there could be a space character.
 - no need to provide `/g` flag, `/i` is optional.
 - don't forget to escape the `(` and `)` that wrap media groups. 


---



### Invert

```js
{ invert: false }
```

The __invert__ option is passed as a __boolean__ value,
it will effectively invert the results returned by the filter. So
if your regex was: `/print/` it will keep __anything that does not
match__ `/print/` and return it to the output.

#### Example

```js
{ regex: /max-width/, invert: true }
```

```css
html {}
@media screen and ( max-width: 1200px ) { ... }
@media screen and ( min-width: 1200px ) { ... }
@media print { ... }
a {}
```

would return

```css
@media screen and ( min-width: 1200px ) { ... }
@media print { ... }
```


__Tips__:
 - use when you don't want to write complicated negative regex.
 - good for stripping out all media with: `{ regex: /.*/i , invert: true }`.



---



### KeepBaseRules

```js
{ keepBaseRules: false }
```

The __keepBaseRules__ option is passed as a __boolean__ value, it
will give you the option of __keeping all the css__ which is __not inside a media query__
if set to `true`, or stripping it out if left to the default `false`.

#### Example

```js
{ regex: /max-width/, keepBaseRules: true }
```

```css
html {}
@media screen and ( max-width: 1200px ) { ... }
@media screen and ( min-width: 1200px ) { ... }
@media print { ... }
a {}
```

would return

```css
html {}
@media screen and ( max-width: 1200px ) { ... }
a {}
```



---


Check out the [EXAMPLES.md file](EXAMPLES.md) for more advanced use-cases.
