import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const SRC_DIR = path.join(__dirname, '../src');
const IMG_DIR = path.join(__dirname, '../assets');

export default { 
    devtool: 'source-map',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env' : { 'NODE_ENV': JSON.stringify('dev') }
        }),
        new ExtractTextPlugin("style.css")
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: [
                'babel'
            ],
            include: SRC_DIR,
            exclude: /node_modules/
        },
        {
          test: /\.(png|jpg)$/,
          include: IMG_DIR,
          loader: 'file-loader?name=images/[name].[ext]'
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        }]
    },
    resolve: {
        alias: {
            '~': SRC_DIR
        }
    },
    postcss: [
        autoprefixer({ browsers: ['last 2 versions'] })
    ]
};
