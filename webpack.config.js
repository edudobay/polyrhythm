const path = require('path')

const outputDir = 'docs'

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, outputDir),
        filename: 'bundle.js',
    },
}
