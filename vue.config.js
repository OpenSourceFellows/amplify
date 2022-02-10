const path = require('path')

module.exports = {
    devServer: {
        host: 'localhost'
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/styles/global.less')]
        }
    }
}
