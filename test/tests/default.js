/* global describe:false, it:false */
/* eslint no-unused-vars: [2, {"varsIgnorePattern": "should"}] */

var postcss = require("postcss"),
    filter = require("../../index.js"),
    fs = require("fs");

require("mocha");
var should = require("should");


describe("return default options", function () {

    var i = "test/fixture.css",
        fixture = fs.readFileSync( i, "utf-8"),
        result;


    /**
     * no options passed to plugin.
     */

    postcss([ filter ])
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

        it("all rules should be in media", function () {

            var isMedia = true;
            result.root.walkDecls( function ( decl ) {
                if ( decl.parent.parent.name !== "media" ) {
                    isMedia = false;
                }
            });
            isMedia.should.equal( true );

        });

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
