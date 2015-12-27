/* global describe:false, it:false */
/* eslint no-unused-vars: [2, {"varsIgnorePattern": "should"}] */

var postcss = require("postcss"),
    filter = require("../../index.js"),
    fs = require("fs");

require("mocha");
var should = require("should");


describe(
    "return { regex: /^screen\\s+and\\s+\\(min-width:\\s+40em\\)$/, " +
    "keepBaseRules: true, invert: true }",
    function () {

        var i = "test/fixture.css",
            fixture = fs.readFileSync( i, "utf-8"),
            result;

        /**
         * options passed to plugin.
         */

        var options = {
            regex: /^screen\s+and\s+\(min-width:\s+40em\)$/i,
            invert: true,
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

        it("should have content", function () {

            result.css.should.not.be.empty();

        });

        it("should be different to the fixture", function () {

            fixture.should.not.equal( result.css );

        });

        it("should have { font-family: sans-serif }", function () {

            var font = result.css.match( /font\-family\: sans\-serif/g );
            should.exist( font );

        });

        describe("@media rules", function () {

            it("should equal 25", function () {

                result.css.match( /@media/g ).should.have.length(25);

            });

            it("should have 2 (screen and (min-width: 40em)) rules", function () {

                var screen = result.css.match( /screen and \(min-width: 40em\)/g );
                screen.should.have.length(2);

            });

        });

    });
