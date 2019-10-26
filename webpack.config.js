const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{ 
            test: /\.js$/, 
            use: { loader: "babel-loader" }, 
            exclude: /node_modules/ // 
                },
                {
            test: /\.css$/, 
            use: [MiniCssExtractPlugin.loader, 'css-loader'] 
                },
            
            ]
            },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
            })
            ]
}

