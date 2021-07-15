# miniprogram-adapter

帮助互动框架适配到阿里系小程序。抹平 dom api 和小程序 api 的差异，目前适配对象：

  - 'window',
  - 'atob',
  - 'devicePixelRatio',
  - 'document',
  - 'Element',
  - 'Event',
  - 'EventTarget',
  - 'HTMLCanvasElement',
  - 'HTMLElement',
  - 'HTMLMediaElement',
  - 'HTMLVideoElement',
  - 'Image',
  - 'navigator',
  - 'Node',
  - 'requestAnimationFrame',
  - 'cancelAnimationFrame',
  - 'screen',
  - 'XMLHttpRequest',
  - 'performance',

## 适配用法

**以 rollup 为例**，使用 webpack 方案找到对应的方法即可：

1. 安装 @rollup/plugin-inject 。

2. 利用 @rollup/plugin-inject 在打包的过程中注入适配对象到代码中。

3. (可选) 若使用的 monorepo 仓库，可使用 @rollup/plugin-modify 替换引用模块。l

下面是小程序 `rollup.miniprogram.plugin.js` 示例可以供参考：

``` JavaScript
import inject from 'rollup-plugin-inject';
import modify from 'rollup-plugin-modify';

const module = '@oasis-engine/miniprogram-adapter';

function register(name) {
  return [module, name];
}

const adapterArray = [
  'window',
  'atob',
  'devicePixelRatio',
  'document',
  'Element',
  'Event',
  'EventTarget',
  'HTMLCanvasElement',
  'HTMLElement',
  'HTMLMediaElement',
  'HTMLVideoElement',
  'Image',
  'navigator',
  'Node',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'screen',
  'XMLHttpRequest',
  'performance',
];
const adapterVars = {};

adapterArray.forEach(name => {
  adapterVars[name] = register(name);
});

export default [
  inject(adapterVars),
  modify({
    find: /@oasis-engine\/([\w-]*)/g,
    replace: (match, moduleName) => `@oasis-engine/${moduleName}/dist/miniprogram`
  }),
];
```


