# Intro

This is a frontend template created by react + tailwindcss + antd + redux + nextjs. As tailwindcss is used, @fortawesome is also imported so you can easily use an Icon by write in className like tailwind. see([@fortawesome](https://fontawesome.com/))
axios has been formatted

## Getting Started

### clone

First, clone this project by

```bash
  git@github.com:cjy4979/frontEndTemplate.git
```

or fork to your own project

### Rename File

duplicate ".env.local-example" using name ".env.local"

```shell
  mv .env.local-example .env.local
  # or
  ren .env.local-example .env.local
```

### Setup

Require: Node.js 16.8 or later

```bash
  npm i
  # or
  yarn
```

As i creted this by yarn, yarn is recommended

### Start Developing or Running the App

```bash
  npm run dev
  # or
  yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

# 介绍

最近技术框架定型了，每次创建前端项目的时候都要重新配置，有点麻烦，就做了这么一个简单的框架，用next+antd+tailwind+fontawesome。
换过很多UI，包括国外很火的mui，用来用去还是antd最好用。
fontawesome是一个icon库，可以直接用class写，既然用了tailwind，那就索性用这个吧，省得去iconfont一个一个下了。
axios和登录的storage也配好了，有角色的话路由守卫得再改改，也许下个版本的模板我会加上。

## 开始

### 下载模板

可以直接clone到本地，也可以fork到自己的仓库

```bash
  git@github.com:cjy4979/frontEndTemplate.git
```

### 改环境名

.env.local 有很多敏感数据，所以用gitignore去掉了，但是为了方便使用，用.env.local-example写了最基本的配置（其实就一个host）

```shell
  mv .env.local-example .env.local
  # or
  ren .env.local-example .env.local
```

### 安装依赖

可以npm i也可以yarn。我个人比较喜欢yarn,我也是用的yarn构建的
注意node版本 >Node.js 16.8

```bash
  npm i
  # or
  yarn
```

### 运行

```bash
  npm run dev
  # or
  yarn dev
```

跑在[http://localhost:3000](http://localhost:3000)
