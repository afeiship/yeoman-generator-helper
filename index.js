require('next-js-core2')(require);


module.exports = nx.declare({
  statics: {
    get_project_name: function(arguments) {
      return path.basename(process.cwd());
    },
    rewrite_props: function(inProps) {
      var props = this.props;
      nx.each(inProps, function(prop, key) {
        inProps[this.camelcase(key)] = this.camelcase(prop);
      }, this);
    },
    camelcase: function(inString) {
      return inString.replace(/[_-]\D/g, function(match) {
        return match.charAt(1).toUpperCase();
      });
    }
  }
});
