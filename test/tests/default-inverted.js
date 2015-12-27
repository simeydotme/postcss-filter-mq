/* global describe:false, it:false */
/* eslint no-unused-vars: [2, {"varsIgnorePattern": "should"}] */

var postcss = require("postcss"),
    filter = require("../../index.js"),
    fs = require("fs");

require("mocha");
var should = require("should");


describe("return { invert: true }", function () {

    var i = "test/fixture.css",
        fixture = fs.readFileSync( i, "utf-8"),
        result;


    /**
     * options passed to plugin.
     */

    var options = {
        invert: true
    };

    postcss([ filter( options ) ])
        .process( fixture )
        .then( function ( out ) {

            result = out;

        });



    /**
     * tests
     */

    it("should not have content", function () {

        var nowhite = result.css.replace( /[\s\t\n\r]/g, "" );
        nowhite.should.be.empty();

    });

    it("should be different to the fixture", function () {

        fixture.should.not.equal( result.css );

    });

});
