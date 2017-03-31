var path = require('path');
var nx = require('next-js-core2');

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
    }
  }
});
