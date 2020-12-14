const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/mango-account-website/'
    : '/',
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')

    config.module
      .rule('svg-sprite') //添加规则
      .test(/\.svg$/) // 所有以 svg 结尾的文件
      .include.add(dir).end() // 只包含 dir 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({...options, plugin: [{removeAttrs: {attrs: 'fill'}}]})).end() // 用于删除 svg 的 fill 属性
    //插件
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 dir 目录
  }
}
