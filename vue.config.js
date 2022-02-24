const path = require('path')
const apiRouter = require('./server/api')

module.exports = {
  outputDir: path.resolve(__dirname, './dist'),

  devServer: {
    host: 'localhost',
    before: (expressApp) => {
      expressApp.use('/api', apiRouter)
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
