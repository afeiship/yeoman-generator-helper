var path = require('path');
var nx = require('next-js-core2');
var rename = require("gulp-rename");
var _ = require('next-camelize');

module.exports = nx.declare({
  statics: {
    discoverRoot: function() {
      return path.basename(process.cwd());
    },
    rewriteProps: function(inProps) {
      nx.each(inProps, function(key, prop) {
        //camelCase
        inProps[nx.camelize(key)] = nx.camelize(prop);
        //CamelCase
        inProps[nx.camelize('_'+key)] = nx.camelize('_'+prop);

      }, this);
    },
    rename: function(inSelf,inSrc,inTarget){
      inSelf.registerTransformStream(
        rename((path) => {
            path.basename = path.basename.replace(inSrc, inTarget);
            return path;
        })
      );
    }
  }
});
