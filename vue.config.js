const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, './dist'),

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/styles/global.less')]
    }
  },

  transpileDependencies: ['vuetify']
}
