const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const sourcePath = path.join(__dirname, './src')
const buildDirectory = path.join(__dirname, './build')

const stats = {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: {
        green: '\u001b[32m',
    },
}

module.exports = (env) => {
    const nodeEnv = env && env.prod ? 'production' : 'development'
    const isProd = nodeEnv === 'production'

    let cssLoader

    const plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            async: true,
            children: true,
            minChunks: 2,
        }),

        // setting production environment will strip out
        // some of the development code from the app
        // and libraries
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
        }),

        // create css bundle
        new ExtractTextPlugin('css/style.css'),

        // create index.html
        new HtmlWebpackPlugin({
            template: isProd ? './prod.ejs' : './dev.ejs',
            filename: isProd ? 'index.php' : 'index.html',
            inject: true,
            production: isProd,
            minify: isProd && {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),

        new CopyWebpackPlugin([
            { 
                from: sourcePath+'/assets/img',
                to: buildDirectory+'/img'
            },
            { 
                from: sourcePath+'/assets/fonts',
                to: buildDirectory+'/fonts'
            },{ 
                from: sourcePath+'/assets/translations',
                to: buildDirectory+'/translations'
            }
        ])
    ]

    if (isProd) {
        plugins.push(
            // minify remove some of the dead code
            new UglifyJSPlugin({
                compress: {
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true,
                },
            })
        )

        cssLoader = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
                options: {
                    modules: false,
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    data: `@import '${path.resolve(__dirname, 'src', 'scss').replace(/\\/g, '/')}/variables';`,
                    outputStyle: 'collapsed',
                    sourceMap: false,
                    includePaths: [sourcePath],
                },
            }],
        })
    } else {
        plugins.push(
            // make hot reloading work
            new webpack.HotModuleReplacementPlugin(),
            // show module names instead of numbers in webpack stats
            new webpack.NamedModulesPlugin(),
            // don't spit out any errors in compiled assets
            new webpack.NoEmitOnErrorsPlugin()
        )

        cssLoader = [{
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: {
                    module: false
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    data: `@import '${path.resolve(__dirname, 'src', 'scss').replace(/\\/g, '/')}/variables';`,
                    outputStyle: 'expanded',
                    sourceMap: true,
                    includePaths: [sourcePath],
                },
            },
        ]
    }

    const entryPoint = isProd ? './main.js' : [
        // activate HMR for React
        'react-hot-loader/patch',

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        `webpack-dev-server/client?http://${host}:${port}`,

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',

        // the entry point of our app
        './main.js',
    ]

    return {
        devtool: isProd ? 'source-map' : 'cheap-module-source-map',
        context: sourcePath,
        entry: {
            main: entryPoint,
        },
        output: {
            path: buildDirectory,
            publicPath: '/',
            filename: 'js/[name]-[hash:8].js',
            chunkFilename: 'js/chunk[name]-[chunkhash:8].js',
        },
        module: {
            rules: [
                {
                    test: /\.(html|svg|gif)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'file-loader',
                        query: {
                            name: 'static/[name]-[hash:8].[ext]',
                        },
                    },
                },
                {
                    test: /\.(css|scss)$/,
                    //exclude: /node_modules/,
                    use: cssLoader,
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
            modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
        },
        plugins,
        performance: isProd && {
            maxAssetSize: 300000,
            maxEntrypointSize: 300000,
            hints: 'warning',
        },
        stats,
        devServer: {
            contentBase: './app',
            publicPath: '/',
            historyApiFallback: true,
            port: port,
            host: host,
            hot: !isProd,
            compress: isProd,
            stats: stats,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        },
    }
}
