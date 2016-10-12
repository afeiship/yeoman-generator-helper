var path = require('path');
var nx = require('next-js-core2');

module.exports = nx.declare({
  statics: {
    discoverRoot: function(arguments) {
      return path.basename(process.cwd());
    },
    rewriteProps: function(inProps) {
      var props = this.props;
      nx.each(inProps, function(key, prop) {
        inProps[nx.camelCase(key)] = nx.camelCase(prop);
      }, this);
    }
  }
});
