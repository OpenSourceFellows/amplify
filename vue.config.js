const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, './dist'),

  devServer: {
    host: 'localhost',
    proxy: 'http://localhost:6000'
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/styles/global.less')]
    }
  },

  transpileDependencies: ['vuetify']
}
