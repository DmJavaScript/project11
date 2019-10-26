const webpack = require('webpack'); // добавлено из вебинара
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // добавили плагин
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // подключаем плагин
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // добавлено из вебинара
const isDev = process.env.NODE_ENV === 'development'; // создаем переменную для development-сборки


module.exports = {
    entry: { main: './src/scripts/script.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].[chunkhash].js' // изменено согласно вебинару
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: [
                    (isDev ? 'style-loader'  : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                            publicPath: '../'
                            }
                        }),
                    'css-loader', 
                    'postcss-loader'
                ]
            }, // изменены условия сборки согласно вебинару, если вы собираете в режиме dev, то плагин MiniCssExtractPlugin загружать не нужно.    
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: {
                loader: "file-loader?name=./images/[dir]/[name].[ext]"
                },
            }, // изменено согласно вебинару
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: "file-loader?name=./fonts/[name].[ext]"
                },
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ // 
            filename: './css/[name].[contenthash].css', // изменено согласно вебинару
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new WebpackMd5Hash(),        
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    global_defs: {
                        "@alert": "console.log",
                    },
                    drop_console: true
                }
            }
        }) // изменено согласно вебинару
    ]
};