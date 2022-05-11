var path = require('path');
var nx = require('@jswork/next');
var rename = require('gulp-rename');
var DEFAULT_OPTIONS = { exclude: ['description', 'registry', 'homepage'] };
var pluralize = require('pluralize');
var ejs = require('ejs');
var fs = require('fs');

require('@jswork/next-underscored');
require('@jswork/next-classify');
require('@jswork/next-camelize');

module.exports = nx.declare({
  statics: {
    discoverRoot: function () {
      return path.basename(process.cwd());
    },
    tmpl: function (inFilename, inData) {
      var compiled = ejs.compile(fs.readFileSync(inFilename, 'utf8'));
      return compiled(inData);
    },
    shortName: function (inName) {
      var name = inName || this.discoverRoot();
      var paths = name.split('-');
      paths.shift();
      return paths.join('-');
    },
    extendProps: function (inContext) {
      var date = new Date();
      nx.mix(inContext.props, {
        year: date.getFullYear(),
      });
    },
    underToDot: function (inContext) {
      this.rename(inContext, /_/, '.');
    },
    rewriteProps: function (inProps, inOptions) {
      var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      nx.each(
        inProps,
        function (key, prop) {
          if (options.exclude.indexOf(key) === -1) {
            //camelCase
            inProps[nx.camelize(key)] = nx.camelize(prop);
            //CamelCase
            inProps[nx.classify(key)] = nx.classify(prop);
            //UNDERSCORED_CASE
            inProps[nx.underscored(key).toUpperCase()] = nx.underscored(prop).toUpperCase();
            // revert like `prefix- ` prop
            inProps[key] = prop;
          }
        },
        this
      );
    },
    renameBy: function (inContext, inCallback) {
      inContext.registerTransformStream(rename(inCallback));
    },
    rename: function (inContext, inSrc, inTarget) {
      console.warn('RENAME will be deprecated!');
      inContext.registerTransformStream(
        rename((path) => {
          path.basename = path.basename.replace(inSrc, inTarget);
          return path;
        })
      );
    },
    ctx: {
      camelize: nx.camelize,
      classify: nx.classify,
      underscored: nx.underscored,
      pluralize: pluralize,
    },
  },
});
