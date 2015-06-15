exercises-FrontendFramework
===========================

关于前端框架的一些练习项目。

1. Angular -Contacts
=========================
201505

![angular-contacts](imgs/angular-contacts.png)

### 描述

使用Angular和Nodejs实现一个简易的Web App通讯录，支持增删改查、搜索、设置显示列、以及用户权限控制(signup,login,logout)。

### 资源
	
- [tutsplus - Building a web app from scratch with angular](https://code.tutsplus.com/courses/building-a-web-app-from-scratch-with-angularjs)

2. ReactJS －Voting
=========================
201506

![react-voting](imgs/react-voting.png)

## 描述

一个使用 React.js 做的简易投票系统，可新增项目、为项目投票，并实时渲染投票结果。

## 启动
`gulp serve`

## 涉及

- Gulp -task runner
- Browserify - 模块化
- Reactify －jsx transformer
- [Firebase](https://www.firebase.com/) - Realtime Database
- [Lo-Dash](https://lodash.com/docs) -  JS 工具库

## 基本架构

	main
		> addbutton
		> feedform
		> feedlist
			> feeditem

## 添加事件

1. 顶级模块与子类模块的通信：
	- 和 `<AddBtn>` 的通信： isShowBtn, onButtonClick();
	- 和 `<FeedForm>` 的通信： isShowForm;
	- 和 `<FeedItem>` `<FeedList>` 的通信：：onVote();	
	- 和 `<FeedForm>` 的通信： onNewItem().

2. 交互
	1. 按钮
		- 描述：点击 add 按钮，影响表单的展现，同时改变按钮的样式和文字
	2. 表单
		- 描述：填写title和desc，点击按钮，下列列表新增一条记录。原表单重置。
		- refs:title,desc,form ; 注意写法： `this.refs.title.getDOMNode().value`
	3. 箭头
		- 描述：点击上下按钮增减投票数，低于0票时显示红色样式
		- 增加唯一标识 id

## 连接数据库 

1. Firebase
	- 引入： `new Firebase('https://[url]');`
	- update()
	- on('value', fn)
- newItem
- vote
- sort


## 资源

- [tutsplus - Getting started with reactjs](https://code.tutsplus.com/courses/getting-started-with-reactjs/lessons/jsx-vs-reactdom)

3. Backbone -Todos
=========================

201407

### About
- A simple Todos which is able to add items, delete items and filter items.

### Tech Points
- BackboneJS
- Unit Testing: mocha, chai, sinon
- Code coverage report: blanketJS

### References & Resources
- https://github.com/sathomas/jsunittest -by Stephen A Thomas
- http://documentcloud.github.io/backbone/docs/todos.html -by Jérôme Gravel-Niquet

###  Live demo:
- Demo: http://heydelilah.github.io/exercises-FrontendFramework/backbone-todos/index.html
- Unit testing: http://heydelilah.github.io/exercises-FrontendFramework/backbone-todos/test.html


