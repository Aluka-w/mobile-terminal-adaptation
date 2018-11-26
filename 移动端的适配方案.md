--> 集中适配方案的总结

# rem和vw布局
  总结: 
  1. 旧的rem布局

    典型: lib-flexible: flex通过Hack手段来根据设备的dpr值相应改变<meta>标签中viewport的值, 使得rem模拟vw的效果

  2. 新的vw布局(我的demo里面并没有解决兼容)




# 设计稿

1. 设计稿大多是750px * 1334px, css像素是750px, dpr=2, 基本按750布局即可

2. 设备像素比(dpr) ＝ 物理像素 / 设备独立像素(css像素)

# vh, vw(页面可视宽度 + 滚动条)

  ## 参考: https://www.w3cplus.com/css/vw-for-layout.html

  1. vw：是Viewport's width的简写,1vw等于window.innerWidth的1%

  2. vh：和vw类似，是Viewport's height的简写，1vh等于window.innerHeihgt的1%

	3. 视口被均分为100单位的vh, 既100vh就是满屏高, 均等分可能出现像素偏差, 并且有兼容性

# cssrem插件
	1. 设置的`cssrem.rootFontSize` 这个参数是: 每次设置值都会除以这个参数返回的 值 + rem = 最后数值





# 第一不依赖框架

## 依赖cssrem这个插件(网易的做法)

### demo: WY-mobile
0. 参考: https://www.cnblogs.com/well-nice/p/5509589.html

1.  第一步
```js
	function initRem() {
		// 7.5基准值:  设计稿宽度 / 100 = 基准值
		var deviceWidth = document.documentElement.clientWidth;
		// 当大于750时候就按照750宽度计算
		if(deviceWidth > 750) deviceWidth = 750;
		document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
	}
	initRem();
	window.addEventListener("resize", function () {
		initRem();
	});
```
2. 第二步

  设置： ```cssrem.rootFontSize = 100 ```, 即设计稿的值都除以100即可
3. 第三步
	height的设置需要注意, 可能填不满

4. 这种方案下, 不想使用rem, 那就直接用px即可


## 手淘团队的lib-flexible方案(vue中也有)

  ### demo: ali-mobile

  1. 与网易团队的区别: 手淘动态增加meta标签, 动态计算dpr, 兼容更多的屏 demoa: ali-mobile

  2. 参考: https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html

  3. 步骤: 

    1. 引入lib-flexible(或者直接引入)
     `<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>`

    2. 删除meta标签

      `<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>`

    3. cssrem的`cssrem.rootFontSize = 75`, 就可以了

    4. 这种方案下, 不想使用rem, 那就直接用px即可


## 依赖cssrem这个插件(博客)

### demo: normal-mobile
```js
  ;(function(win, doc){
  function fontSizeModify() {
    var idealWidth = doc.documentElement.clientWidth,
      htmlEle = doc.children[0];
      fontSize   = 32 * idealWidth/750;
      // 当宽度大于600时, font-size保持不变
      // if (idealWidth >=600) {
      //   fontSize = 32 * 600/750;
      // }
    htmlEle.style.fontSize = fontSize + "px";
  }
  function throttle(method, content) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
      method.call(content);
    }, 100);
  }
  fontSizeModify();
  win.addEventListener("resize", function(){
    throttle(fontSizeModify);
  });
})(this, document);
```
2. 第二步

  设置： ```cssrem.rootFontSize = 32 ```, 因为乘以了32的原因

3. 这种方案下, 不想使用rem, 那就直接用px即可

# 第二, Vue-cli的手机适配

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

## px转成vw(重在学习) demo: vue-mobile
  1. 参考网址: https://www.w3cplus.com/mobile/vw-layout-in-vue.html
  
  2. demo: vue-mobile

  3. 缺点: 兼容性较差

  4. 实现步骤: 

    1. 安装依赖: `npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano --S`

    2. 在根目录`.postcssrc.js`中, 对新安装的PostCSS插件进行配置

    3. 
```js
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // "autoprefixer": {}, // 因为postcss-cssnext, cssnano都有类似功能
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
```
4. 保留px方案

  痛过添加类名, `.ignore`


# 第三, create-react-app搭配webpack做适配(事实上还是webpack)

## px转rem(手淘团队的lib-flexible) demo: react-normal

1. 参考: https://blog.csdn.net/zhuming3834/article/details/84319296

1. 步骤:

    1. 安装`cnpm i lib-flexible postcss-px2rem`

    2.找到`node_modules/react-scripy/config/webpack.config.dev.js`

  ```js
  const px2rem = require('postcss-px2rem');

  const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        // 这些是配置rem的
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          px2rem({remUnit: 75})  // 这里表示 75px = 1rem
        ],
      },
    },
    {
      loader: require.resolve('less-loader') // compiles Less to CSS
    }
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};
  ```

3. 找到`node_modules/react-scripy/config/webpack.config.prod.js`

```js
  plugins: () => [
  require('postcss-flexbugs-fixes'),
  require('postcss-preset-env')({
    autoprefixer: {
      flexbox: 'no-2009',
    },
    stage: 3,
  }),
  px2rem({remUnit: 75})
],
```
4. 在index.js中引入import 'lib-flexible'

## px转vw(手淘推出的vw布局)  demo: react-mobile

1. 参考: https://go.ctolib.com/article/wiki/82279

2. 步骤: 有点尴尬, 没配置出来, demo没有用

