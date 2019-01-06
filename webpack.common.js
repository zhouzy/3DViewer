const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const webpack = require('webpack');
const baseExportChunks = ['manifest', 'vendor'];

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        vendor: ['vue', 'vuex', 'vue-router', 'axios', 'lodash'],
        'index-app': '@/main.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.js',

            '@': resolve('src'),
            // 公用less
            '@libLess': resolve('src/less'),
            '@libJs': resolve('src/lib-js'),

            '@Service': resolve('src/service'),
            '@libComponents': resolve('src/lib-components'),

            //样式主题
            '@Theme': resolve('src/theme/index.css'),
            '@Static': resolve('src/static'),

            // 登录
            '@Login': resolve('src/pages/login'),
            // 主页
            '@Index': resolve('src/pages/index'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'less': 'vue-style-loader!css-loader!less-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|TTF)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=100000&mimetype=application/font-woff',
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=100000&mimetype=application/font-woff',
            },

            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
            qs: 'querystring'
        }),
        // vendor为公用bundle的名称
        // mainfest用来提取运行时代码，来实现vendor的缓存
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new HtmlWebpackPlugin({
            title: '首页',
            filename: 'index.html',
            template: 'public/index.html',
            showErrors: true,
            chunks: baseExportChunks.concat(['index-app'])
        }),
        new CopyWebpackPlugin([
            {
                "from": resolve("./cam"),
                "to": "./cam",
                "toType": 'dir'
            },
            {
                "from": resolve("./public/favicon.ico"),
                "to": "./favicon.ico",
                "toType": 'file'
            }

        ])
    ]
};
