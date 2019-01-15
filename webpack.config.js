// This library allows us to combine paths easily
const path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'build', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js']
    }
};
