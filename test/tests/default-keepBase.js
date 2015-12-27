/* global describe:false, it:false */
/* eslint no-unused-vars: [2, {"varsIgnorePattern": "should"}] */

var postcss = require("postcss"),
    filter = require("../../index.js"),
    fs = require("fs");

require("mocha");
var should = require("should");


describe("return { keepBaseRules: true }", function () {

    var i = "test/fixture.css",
        fixture = fs.readFileSync( i, "utf-8"),
        result;


    /**
     * options passed to plugin.
     */

    var options = {
        keepBaseRules: true
    };

    postcss([ filter( options ) ])
        .process( fixture )
        .then( function ( out ) {

            result = out;

        });



    /**
     * tests
     */

    it("should be same as the fixture", function () {

        fixture.should.equal( result.css );

    });

    it("should have { font-family: sans-serif }", function () {

        var font = result.css.match( /font\-family\: sans\-serif/g );
        should.exist( font );

    });

    describe("@media rules", function () {

        it("should equal 41", function () {

            result.css.match( /@media/g ).should.have.length(41);

        });

        it("should have 17 (min-width: 40em) rules", function () {

            result.css
                .match( /@media screen and \(min\-width\: 40em\)/g )
                .should.have.length(17);

        });

    });

});
