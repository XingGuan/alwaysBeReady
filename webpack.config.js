const path = require('path');  // node自带包
module.exports = {
  entry:'./JS基础算法/index.ts',   // 打包对入口文件，期望打包对文件入口
  output:{
    filename:'test.js',   // 输出文件名称
    path:path.resolve(__dirname,'dist')  //获取输出路径
  },
  mode: 'development',   // 整个mode 可以不要，模式是生产坏境就是压缩好对，这里配置开发坏境方便看生成对代码
  module:{
  rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts']      // 解析对文件格式
  },
}
