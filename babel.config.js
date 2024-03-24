module.exports = {
  overrides: [
    {
      test: './node_modules/ethers',
      plugins: [
        ["@babel/plugin-transform-private-methods", { "loose": true }]
      ]
    }
  ],
  plugins: [
    [
      'rewrite-require',
      {
        aliases: {
          vm: 'vm-browserify',
        },
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          hooks: './src/hooks',
          messaging: './src/messaging',
          providers: './src/providers',
          screens: './src/screens',
          stores: './src/stores',
          styles: './src/styles',
          types: './src/types',
          utils: './src/utils',
          services: './src/services',
          reducers: './src/reducers',
          routes: './src/routes',
          extras: './src/extras',
        },
        root: ['.'],
      },
    ],
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv'],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
