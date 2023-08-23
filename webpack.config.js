const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')

// const servicePath = slsw.lib.serverless.serviceDir.split(__dirname)
// const entriesMap = slsw.lib.entries
// for (const key of Object.keys(entriesMap)) {
//   entriesMap[key] = path.join(servicePath[1], entriesMap[key].substring(1))
// }

// console.log({ entriesMap })

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  output: {
    library: {
      type: 'commonjs'
    },
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
            path.resolve(__dirname, '.husky')
          ]
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  },
  optimization: {
    nodeEnv: false
  },
  plugins: []
}
