const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = merge(common, {
    devtool: 'source-map',
    output: {
        // 文件输出目录
        path: resolve('./3DViewer'),
        // 资源加载路径
        publicPath: '/SmartPolice/3DViewer/',
        // 输出的bundle文件名
        filename: '[name].js',
        // 输出的chunk文件名
        chunkFilename: '[name].js'
    },

    devServer: {
        contentBase: resolve("./app"),
        inline:true,
        publicPath: "/SmartPolice/app",
        open: false,
        index: '/index.html'
    },

    plugins: [
        // 在每次构建前清理 /app 文件夹
        new CleanWebpackPlugin(['app'])
    ]
});
