const path = require('path')

module.exports = {
    outputDir: path.resolve(__dirname, "./server/views"),

    devServer: {
        host: 'localhost'
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/styles/global.less')]
        }
    },

    transpileDependencies: [
      'vuetify'
    ]
}
