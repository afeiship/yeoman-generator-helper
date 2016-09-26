var path = require('path');
require('next-js-core2')(require);

module.exports = nx.declare({
  statics: {
    get_project_name: function(arguments) {
      return path.basename(process.cwd());
    },
    rewrite_props: function(inProps) {
      var props = this.props;
      nx.each(inProps, function(key, prop) {
        inProps[nx.camelCase(key)] = nx.camelCase(prop);
      }, this);
    }
  }
});
