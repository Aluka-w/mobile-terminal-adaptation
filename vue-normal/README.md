## px转rem(手淘团队的lib-flexible)demo: vue-normal

1. 参考: https://blog.csdn.net/qq_22844483/article/details/79730604

2. 步骤:

  1. `npm install lib-flexible --save`

  2. 在main.js引入  `import 'lib-flexible/flexible.js'`

  3. 把项目根目录的index.html 头部删除自动生成的meta标签, lib-flexible会根据屏幕自动生成相对于的meta标签

  4. 安装 `npm install px2rem-loader --save-dev` 把px转成rem

  5. 修改build/utils.js, 在cssLoader变量中
```js
const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      importLoader: 5 // 在加载cssLoader之前加载的loader个数
    }
  }
const px2remLoader = {
  loader: 'px2rem-loader',
  options: {
    emUnit: 75 // 设计稿的1/10
  }
}
function generateLoaders(loader, loaderOptions) {
  const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader, px2remLoader]   // 注释的地方是需要加的
  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap: options.sourceMap
      })
    })
  }
}
```
  6. 关于px2rem(保留px方案)   

    1. 直接写px，编译后会直接转化成rem 
    2. 在px后面添加/no/，不会转化px，会原样输出。 — 一般border需用这个
    3. 在px后面添加/px/,会根据dpr的不同，生成三套代码。---- 一般字体需用这个

3. 缺点: 当页面在ipad中时, 就开始没那么宽了