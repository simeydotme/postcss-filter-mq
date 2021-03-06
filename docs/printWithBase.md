### Print with Base Styles

#### Before
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






### After
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
