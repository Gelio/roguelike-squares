var path = require('path'),
    merge = require('webpack-merge'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');


var TARGET = process.env.npm_lifecycle_event;
var PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    node_modules: path.join(__dirname, 'node_modules')
};

var common = {
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
                include: [
                    PATHS.app,
                    PATHS.node_modules
                ]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
                include: PATHS.app,
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: PATHS.app,
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            },
            {
                test: /\.md$/,
                loader: 'raw',
                include: PATHS.app
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
};

if(TARGET === 'start' || !TARGET)
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
else if(TARGET === 'build')
    module.exports = merge(common, {});