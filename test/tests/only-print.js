/* global describe:false, it:false */
/* eslint no-unused-vars: [2, {"varsIgnorePattern": "should"}] */

var postcss = require("postcss"),
    filter = require("../../index.js"),
    fs = require("fs");

require("mocha");
var should = require("should");


describe("return { regex: /print/ }", function () {

    var i = "test/fixture.css",
        fixture = fs.readFileSync( i, "utf-8"),
        result;

    /**
     * options passed to plugin.
     */

    var options = {
        regex: /print/
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

    it("should not have { font-family: sans-serif }", function () {

        var font = result.css.match( /font\-family\: sans\-serif/g );
        should.not.exist( font );

    });

    describe("@media rules", function () {

        it("all rules should be in print @media", function () {

            var isPrint = true;
            result.root.walkDecls( function ( decl ) {
                if ( decl.parent.parent.params.match("print") === null ) {
                    isPrint = false;
                }
            });
            isPrint.should.equal( true );

        });

        it("should equal 1", function () {

            result.css.match( /@media/g ).should.have.length(1);

        });

        it("should have no (screen) rules", function () {

            var screen = result.css.match( /@media.*screen/g );
            should.not.exist( screen );

        });

    });

});
