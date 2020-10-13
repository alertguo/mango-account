const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname,'src/assets/icons')

    config.module
      .rule('svg-sprite') //添加规则
      .test(/\.svg$/) // 所有以 svg 结尾的文件
      .include.add(dir).end() // 只包含 dir 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
    //插件
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'),[{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 dir 目录
  }
}
