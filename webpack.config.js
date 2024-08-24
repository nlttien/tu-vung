// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // Tạo React component cho SVG
            },
          },
        ],
      },
    ],
  },
};
