const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  return {
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
      historyApiFallback: true,
    },
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, env && env.production ? 'build' : 'public'),
      filename: 'bundle_[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                esModule: true,
                modules: {
                  localIdentName: '[local]_[hash:base64:5]',
                  exportLocalsConvention: 'camelCase',
                },
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.(png|jp(e*)g|svg|woff)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        src: path.resolve('./src'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: __dirname + '/public/assets/img/logo.png',
        template: __dirname + '/public/index.html',
        filename: 'index.html',
        inject: 'body',
      }),
      new MiniCssExtractPlugin({ filename: '[name]_[chunkhash].css' }),
    ],
  };
};
