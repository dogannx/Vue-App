const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Backend adresin neyse onu yaz
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  lintOnSave: false
});
