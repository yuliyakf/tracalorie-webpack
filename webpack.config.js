const path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development', 
    entry: './src/app.js', //entry point
    output: {
        path: path.resolve(__dirname, 'dist'), //helps us to use absolute file paths
        filename:'bundle.js',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        }, 
        port: 3000,
        open: true,
        hot: true, 
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [{
            test: /\.css$/,  //regular expression anyhting that ends with css
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
           test: /\.js$/,  //regular expression anyhting that ends with js
           exclude: /node_modules/,
           use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
           },
        },
    ],
},
plugins: [
    new HtmlWebpackPlugin ({
        title: 'Webpack App', 
        filename: 'index.html',
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
]
};