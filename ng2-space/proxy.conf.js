module.exports = {
  '/upload-api': {
    target: 'http://beta-hr.edianzu.cn',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/upload-api': '',
    },
  },
}
