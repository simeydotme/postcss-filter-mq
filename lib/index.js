
var _ = require("underscore"),
    postcss = require("postcss");

module.exports = postcss.plugin("postcss-filter-mq", function ( opts ) {

    return function ( css ) {

        /**
         * the default options for the plugin
         * @type {Object}
         *       @regex: A regular expression to filter against
         *       @invert: invert the regular expression match
         *       @keepBaseRules: whether to keep the non-media rules in result
         */

        var defaults = {

            regex: /.*/i,
            invert: false,
            keepBaseRules: false

        };

        opts = _.extend( defaults, opts ) || defaults;

        /**
         * check that the passed css actually has nodes
         */
        if ( css.nodes.length ) {

            /**
             * if we've chosen to _not_ keep the base rules
             */

            if( !opts.keepBaseRules ) {

                /**
                 * we walk through all the @rules which do not have
                 * the name of "media" and remove them. This is for getting
                 * rid of stuff like @keyframes and @charset and @import
                 */

                css.walkAtRules( function ( rule ) {

                    if ( rule.name !== "media" ) {

                        rule.remove();

                    }

                });

                /**
                 * now walk through every rule, and if it's parent
                 * is not a media query, then we remove it so we are
                 * left with only the media queries and their children.
                 */

                css.walkRules( function ( rule ) {

                    if ( rule.parent.type !== "atrule" ) {

                        rule.remove();

                    }

                });

            }

            /**
             * lets remove any media queries which did not pass
             * our filter. Or remove the ones that did pass if we
             * have inverted the query.
             */

            css.walkAtRules( "media", function ( rule ) {

                var test = new RegExp( opts.regex );
                var matched = test.test( rule.params );

                /**
                 * if the rule doesn't match our regex filter,
                 * and the invert option is false, then remove this query
                 */

                if ( !opts.invert && !matched ) {

                    rule.remove();

                /**
                 * but if the rule _does_ match our regex filter,
                 * check if we've inverted the query, and remove if we did.
                 */

                } else if ( opts.invert && matched ) {

                    rule.remove();

                }

            });

        }

    };

});
