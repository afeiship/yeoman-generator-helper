var path = require('path');
var nx = require('@feizheng/next-js-core2');
var rename = require('gulp-rename');
var DEFAULT_OPTIONS = { exclude: ['description'] };

// import packages:
require('@feizheng/next-classify');
require('@feizheng/next-camelize');
require('@feizheng/next-underscored');

module.exports = nx.declare({
  statics: {
    discoverRoot: function() {
      return path.basename(process.cwd());
    },
    rewriteProps: function(inProps, inOptions) {
      var options = nx.mix(DEFAULT_OPTIONS, inOptions);
      nx.each(
        inProps,
        function(key, prop) {
          if (options.exclude.indexOf(key) === -1) {
            //camelCase
            inProps[nx.camelize(key)] = nx.camelize(prop);
            //CamelCase
            inProps[nx.classify(key)] = nx.classify(prop);
            //UNDERSCORED_CASE
            inProps[nx.underscored(key).toUpperCase()] = nx.underscored(prop).toUpperCase();
          }
        },
        this
      );
    },
    rename: function(inSelf, inSrc, inTarget) {
      inSelf.registerTransformStream(
        rename((path) => {
          path.basename = path.basename.replace(inSrc, inTarget);
          return path;
        })
      );
    }
  }
});
