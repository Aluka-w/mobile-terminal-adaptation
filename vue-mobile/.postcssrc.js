// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {}, // 处理元素容器宽高比, 感觉像scss的继承, 没什么卵用
    "postcss-write-svg": { // 处理移动端1px的解决方案
      utf8: false 
    }, 
    "postcss-cssnext": {}, // 该插件可以让我们使用CSS未来的特性，其会对这些特性做相关的兼容性处理
    "postcss-px-to-viewport": { // 主要用来把px单位转换为vw、vh、vmin或者vmax
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750 
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置 
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除） 
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw 
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名 
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值 
      mediaQuery: false // 允许在媒体查询中转换`px`
    }, 
    "cssnano": {  // 主要用来压缩和清理CSS代码
      preset: "advanced", 
      autoprefixer: false, // 插件是用来自动处理浏览器前缀的一个插件, 重复调用, postcss-cssnext已经有了
      "postcss-zindex": false // 启用了这个插件，z-index的值就会重置为1。这是一个天坑
    }
  }
}
