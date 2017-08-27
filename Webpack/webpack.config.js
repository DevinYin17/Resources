module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + '/src/main.js',
  output: {
    path: __dirname + '/build',
    filename: 'app.js'
  },
  devServer: {
    contentBase: "./build",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  module: {
    rules: [{
      test: /\.js$/,
      xclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }]
  }
};
