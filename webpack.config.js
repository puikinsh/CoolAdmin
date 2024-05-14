const path = require('path');

module.exports = {
    mode: 'development',
    entry: './js/main.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};