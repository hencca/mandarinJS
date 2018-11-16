const path = require('path');
module.exports = {
    entry:"./src/mandarin.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'mandarin.min.js'
    }
};