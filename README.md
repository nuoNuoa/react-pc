# React-PC

这是一个关于文章发布的简易后台系统，主要用于 react,ant-design 和 mobx 的练习。页面包含了登录，首页，文章以及发布四个页面。用户需要先登录之后才能进入首页，期间有 token 失效处理。
重要功能在于文章管理页面，用户可以选择条件进行筛选，获取文章列表。可以对文章进行删改操作。发布页面用户可以创建文章，用到了编辑器组件，图片上传功能，能够选择上传图片数量。

## 技术栈

`React`, `vite`,`scss`,`mobx`,`ant-design`,`echarts`,`axios`

## 待解决问题：

### observer 使用时有 Fast refresh only works when a file only exports components 报错

做了解决方案整理
https://blog.csdn.net/weixin_46600029/article/details/133620577?spm=1001.2014.3001.5501

### 页面滚动时，导航栏不是固定的

设置最外层 Layout 的 style={{ height: '100vh' }}

### 函数组件创建高阶组件时，报错：'xxx' is missing in props validation

最优解决： 引入 prop-types

### 侧边导航路由和 Breadcrumb 报错

已处理：版本问题

### 编辑器是两个头

关闭严格模式

### Menu 中的 Select 的 defaultValue 报错

已处理：不再 defaultValue 中写默认值，通过 Menu 的 initialValues 去设置 Menu.Item 中 Select 的默认值

### publish.jsx 有 bug ，点击三图上传成功后，选择单图，图片上传组件还是三张图

已处理:因为 fileList 没有及时刷新 ，通过 useRef 创建一个仓库

### 标签属性内属性值需要计算获得

这样写：title:`${articleId?'更新成功':'发布成功'}`
不在属性值之后写运算，在外部完成计算之后，再将该变量赋值给属性（例如发布页通过 articleId 决定 Breadcrumb 中 Items 的值）
可以使用的表达式

1. 字符串、数值、布尔值、null、undefined、object（ [] / {} ）
2. 1 + 2、'abc'.split('')、['a', 'b'].join('-')
3. fn()

### bug menu 不能根据路由发生变化

已解决，通过 Menu 的 selectedKey

### 修改文章提交是 接口不通

通了

## React 知识点

### Context

已整理
