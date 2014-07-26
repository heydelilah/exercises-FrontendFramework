window.app = {};

app.Todo = Backbone.Model.extend({
	defaults: {
		title: "",
		done: false
	},
	toggleStatus: function(){
		var current = this.get('done');
		this.set('done', !current)
	}
});

app.Todos = Backbone.Collection.extend({
	model: app.Todo
})

app.TodoItem = Backbone.View.extend({
	tagName: "li",
	template: _.template(
		'<label class=" <% if(done) print("delete") %>">'
		+ '<input type="checkbox" <% if(done) print("checked") %>/>'
		+ '<%- title %>'
		+ '</label>'
	),
	events:{
		'click input': 'eventChangeStatus'
	},
	render: function () {
		var template = this.template(this.model.attributes)
		this.$el.html(template);
		return this;
	},
	eventChangeStatus: function(){
		this.model.toggleStatus()
		this.$el.find('label').toggleClass('delete')
	}
})

app.TodoItems = Backbone.View.extend({
	id: 'todo',
	data: [], // 保存静态数据
	doms: {}, // jquery对象，dom元素
	template: _.template(
		 '<header class="todoHeader">'
		+ 	'<h1>Todo</h1>'
		+ 	'<input type="text" placeholder="What are you going to do?">'
		+ '</header>'
		+ '<section class="todoFilter">'
		+ '	<span class="label label-info label-primary" data-type="all">All</span>'
		+ '	<span class="label label-info " data-type="done">Done</span>'
		+ '	<span class="label label-info" data-type="undone">Undone</span>'
		+ '</section>'
		+ '<section class="todoBody">'
		+ 	'<ul></ul>'
		+ '</section>'
	),
	events: {
		'keypress .todoHeader input': 'eventInputEnter',
		'click .todoFilter span[data-type="all"]': 'eventShowAll',
		'click .todoFilter span[data-type="done"]': 'eventShowDone',
		'click .todoFilter span[data-type="undone"]': 'eventShowUndone'
	},
	initialize: function(){
		var html = this.template();
		this.$el.append(html);

		this.doms.input = this.$el.find('header input');
		this.doms.body = this.$el.find('section ul');

		// 绑定事件
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'change', this.eventChangeStatus);
	},
	render: function(){
		this.addAll();
		this.updateFakeData();
		return this;
	},
	eventChangeStatus: function(ev){
		// 更新静态数据的状态
		var data = this.data;
		for (var i = 0; i < data.length; i++) {
			if(data[i].title === ev.attributes.title){
				data[i].done = ev.attributes.done
			}
		};
	},
	// 更新静态数据
	updateFakeData: function(){
		this.data = this.collection.toJSON();
	},
	// 新增
	eventInputEnter: function(ev, testing){
		if (ev.keyCode != 13 && !testing) return;
		if (!this.doms.input.val()) return;

		this.collection.add({title: this.doms.input.val()});
		this.doms.input.val('');

		this.updateFakeData();
	},
	addAll: function(){
		this.collection.each(this.addOne, this);
	},
	addOne: function(todo){
		var item = new app.TodoItem({model: todo});
		this.doms.body.append(item.render().el);
	},
	// 按钮事件 -显示全部
	eventShowAll: function(ev){
		this.filterItemStatus(ev, null);
	},
	// 按钮事件 -显示已完成
	eventShowDone: function(ev){
		this.filterItemStatus(ev, true);
	},
	// 按钮事件 -显示未完成
	eventShowUndone: function(ev){
		this.filterItemStatus(ev, false);
	},
	// 状态过滤
	filterItemStatus: function(ev, status){
		// 添加标签激活状态
		var label = $(ev.target);
		label.siblings().removeClass('label-primary');
		label.addClass('label-primary');

		var items;
		// 过滤数据
		if(status == null){
			items = this.data;
		}else{
			items = this.data.filter(function(item, i , data){
				if(item.done === status){
					return item;
				}
			});
		}

		// 清空 DOM
		this.$el.find('li').remove();
		// 清空 collection
		this.collection.reset();
		// 重新添加数据
		this.collection.add(items);
	}
})

