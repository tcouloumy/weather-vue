/* eslint-disable no-param-reassign */

module.exports = {
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'meteoVue';
      return args;
    });
  }
};
