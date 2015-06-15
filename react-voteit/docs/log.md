# 静态页面

1. 分块
main
	addbutton
	feedform
	feedlist
		feeditem

2. 添加基础样式

3. 静态数据

# 添加交互

1. 按钮的show/hide; 样式和文字改变。
	- 传递的属性有：
		- 和<AddBtn>的通信： isShowBtn, onButtonClick()
		- 和<FeedForm>的通信： isShowForm, 
2. 新增项目
	- 描述：填写title和desc，点击按钮，下列列表新增一条记录。原表单重置。
	- refs:title,desc,form 注意写法： `this.refs.title.getDOMNode().value`
	和<FeedForm>的通信： onNewItem
3. 投票
	- 描述：点击按钮增减投票数，低于0票时显示红色样式
	- Lo-Dash

