var path = require('path');
var nx = require('next-js-core2');
var rename = require("gulp-rename");

module.exports = nx.declare({
  statics: {
    discoverRoot: function() {
      return path.basename(process.cwd());
    },
    rewriteProps: function(inProps) {
      nx.each(inProps, function(key, prop) {
        //camelCase
        inProps[nx.camelCase(key)] = nx.camelCase(prop);
        //CamelCase
        inProps[nx.camelCase('_'+key)] = nx.camelCase('_'+prop);
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
