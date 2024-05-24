/** @type {import('@babel/core').ConfigFunction} */
module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        modules: 'commonjs', // Garante que os módulos sejam transformados para CommonJS
      },
    ],
  ];
  const plugins = ['@babel/plugin-transform-modules-commonjs'];

  return {
    presets,
    plugins,
  };
};
