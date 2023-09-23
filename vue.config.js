const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true
})

module.exports = {
  devServer:{
    host: '0.0.0.0',
    port: 8086,
    //代理服务器，让前端伪装成和后端一样的端口访问，解决跨域问题
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8088',
    //     ws: true, // 是否启用websockets
    //     changeOrigin: true,  // 代理时是否更改host
    //     pathRewrite: {
    //       '^/api': '' //这里理解成用'/api'代替target里面的地址
    //     }
    //   }
    }
  // }
}
