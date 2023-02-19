# Module Federation Vue Demo

## 模块联邦问题记录

1.  output.publicPath 设置为 auto
2.  optimization.splitChunks 设置为 false
3.  vue 组件样式以模块方式导入，scoped 情况下会丢失样式
