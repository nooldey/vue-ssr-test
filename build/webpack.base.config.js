const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports =  {
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname,'../dist'),
        publicPath: '/dist',
        filename: '[name].[chunkhash:8].js'
    },
    resolve: {
        alias: {
            'public': path.resolve(__dirname,'../public')
        }
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        use: 'css-loader?minimize',
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    // performance这部分不理解
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    plugins: isProd
        ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
            new ExtractTextPlugin({
                filename: 'common.[chunkhash:8].css'
            })
        ]
        : [
            new FriendlyErrorsPlugin()
        ]
}
