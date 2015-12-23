
var _ = require("underscore"),
    postcss = require("postcss");

module.exports = postcss.plugin("postcss-move-media-queries", function ( opts ) {

    return function ( css, result ) {
    
        var defaults = {

            regex: ".*",
            keep: false,
            invert: false

        };

        opts = _.extend( defaults, opts ) || defaults;
        var test = new RegExp( opts.regex , "i" );

        // remove all non-media at-rules;
        
        if ( css.nodes.length ) {

            // remove non-media nodes if we don't want to keep
            if( !opts.keep ) {

                css.walkAtRules( function( rule ) {

                    if ( rule.name !== "media" ) {

                        rule.remove();

                    }

                });

                // remove every rule which is not inside
                // the remaining media queries

                css.walkRules( function( rule ) {

                    if ( rule.parent.type !== "atrule" ) {

                        rule.remove();

                    }

                });

            }

            // remove every rule which doesn't
            // match our passed regex

            css.walkAtRules( "media", function( rule ) {

                var matched = test.test( rule.params );

                if ( !matched && !opts.invert ) {

                    rule.remove();

                } else if ( matched && opts.invert ) {

                    rule.remove();

                }

            });


        }
        
    };

});
