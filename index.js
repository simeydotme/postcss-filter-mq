
var _ = require("underscore"),
    postcss = require("postcss");

module.exports = postcss.plugin("postcss-move-media-queries", function ( opts ) {

    return function ( css, result ) {
    
        var defaults = {

            combine: true,
            filter: false

        };

        opts = _.extend( defaults, opts ) || defaults;

        if ( opts.filter && _.isObject( opts.filter ) ) {

            var test = new RegExp( opts.filter.regex , opts.filter.flags );

            // remove all non-media at-rules;
            
            if ( css.nodes.length ) {

                // remove non-media nodes if we don't want to keep
                if( !opts.filter.keep ) {

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

                    if ( !matched && !opts.filter.invert ) {

                        rule.remove();

                    } else if ( matched && opts.filter.invert ) {

                        rule.remove();

                    }

                });

            }

        }
        
    };

});
