module.exports = {
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
          providers: './src/providers',
          screens: './src/screens',
          stores: './src/stores',
          styles: './src/styles',
          types: './src/types',
          utils: './src/utils',
        },
        root: ['.'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
