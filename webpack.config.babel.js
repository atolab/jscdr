const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: 'jscdr',
        libraryTarget: 'umd'
    },
};
