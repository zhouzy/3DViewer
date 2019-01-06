const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = merge(common, {
    output: {
        // 文件输出目录
        path: resolve('./wap'),
        // 资源加载路径
        publicPath: '/wap/',
        // 输出的bundle文件名
        filename: '[name].[chunkhash:4].js',
        // 输出的chunk文件名
        chunkFilename: '[name].[chunkhash:4].js'
    },
    devtool: 'source-map',
    plugins: [
        // 在每次构建前清理 /build-dist 文件夹
        new CleanWebpackPlugin(['wap']),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"prod"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            sourceMap: true,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            sourceMap: true,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
                drop_debugger: true,
                drop_console: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    ]
});
