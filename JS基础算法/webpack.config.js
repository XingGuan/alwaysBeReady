/*
 * @Descripttion: 
 * @Author: GXing
 * @Date: 2023-02-18 14:56:29
 */
const path = require('path');  // node自带包
module.exports = {
  entry:'./给一个数组，找出其中和为n的两个元素/two-numbers-sums.ts',   // 打包对入口文件，期望打包对文件入口
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
