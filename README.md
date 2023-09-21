## 介绍

@andi/ui 是基于 React 的 UI 组件库，主要用于研发企业级中后台产品。

## 安装

- 使用 npm 或 yarn 安装

```
npm install ant --save

yarn add ant
```

## 浏览器引入

在浏览器中使用 script 和 link 标签直接引入文件，并使用全局变量 ant
我们在 npm 发布包内的 antdesign/dist 目录下提供了 ant.js

## 示例

```tsx
import { Button } from "@andi/ui";
ReactDOM.render(<Button>按钮</Button>, mountNode);
```
