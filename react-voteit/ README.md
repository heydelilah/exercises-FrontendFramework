voteit
==========

## 描述

一个使用 React.js 做的简易投票系统，可新增项目、为项目投票，并实时渲染投票结果。

## 启动
`gulp serve`

## 涉及

- Gulp -task runner
- Browserify - 模块化
- Reactify －jsx transformer
- Firebase -实时database

## 基本架构

	main
		> addbutton
		> feedform
		> feedlist
			> feeditem

## 添加事件

1. 顶级模块与子类模块的通信：
	- 和 <AddBtn> 的通信： isShowBtn, onButtonClick();
	- 和 <FeedForm> 的通信： isShowForm;
	- 和 <FeedItem> <FeedList> 的通信：：onVote();	
	- 和 <FeedForm> 的通信： onNewItem().

2. 交互
	1. 按钮
		- 描述：点击 add 按钮，影响表单的展现，同时改变按钮的样式和文字
	2. 表单
		- 描述：填写title和desc，点击按钮，下列列表新增一条记录。原表单重置。
		- refs:title,desc,form ; 注意写法： `this.refs.title.getDOMNode().value`
	3. 箭头
		- 描述：点击上下按钮增减投票数，低于0票时显示红色样式
		- 增加唯一标识 id

3. Lo-Dash
	- uniq();
	- findIndex(array, {attr: value}); 返回index;
	- pull() 删除数组里的某个值.


## 连接数据库 

1. Firebase
	- [官网](https://www.firebase.com/)
	- 安装： `npm install firebase`
	- 特性
		- Realtime Database
			- 主动推送，是基于websocket的吗？
		- stored as JSON objects.
	- 使用
		- 引入： `new Firebase('https://[url]');`
		- update()
		- on('value', fn)
- newItem
- vote
- sort


## 资源

- [tuts+  －Getting Started With React.js](https://code.tutsplus.com/courses/getting-started-with-reactjs/lessons/jsx-vs-reactdom)