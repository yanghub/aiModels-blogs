module.exports = {
  // assetsDir: 'static',
  // parallel: false,
  // publicPath: './',
  // productionSourceMap: false,//不生成map文件
  devServer: {
    // open: process.platform === 'darwin',
    // host: 'localhost',
    // disableHostsCheck: true,
    //去除eslint
    allowedHosts: [
      'https://xxx',
      'https://xxx'
    ],
    overlay: {
      warnings: false,
      errors: false
    },
    port: 8080,
    // open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9099/', //对应自己的接口
        changeOrigin: true, //是否跨域
        ws: true,
        pathRewrite: {
          '^/api': '' //替换地址
        }
      },
      '/test': {
        target: 'http://xxxx',  // 目标认证服务地址
        changeOrigin: true,               // 处理跨域问题
        // pathRewrite: { '^/test': '' },    // 可选：去掉 /auth 前缀
        secure: false,                    // 如果目标服务器是 HTTPS 且使用自签名证书，设置为 false
      },
    },
    host: "0.0.0.0",
    // proxy: "http://api.test.com",//可以是一个指向开发环境 API 服务器的字符串.如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
  }
}