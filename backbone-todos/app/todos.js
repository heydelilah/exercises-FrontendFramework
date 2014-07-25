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
		'<label>'
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
		this.$el.toggleClass('delete')
	}
})

app.TodoItems = Backbone.View.extend({
	id: 'todo',
	template: _.template(
		 '<header class="todoHeader">'
		+ 	'<h1>Todo</h1>'
		+ 	'<input type="text" placeholder="What are you going to do?">'
		+ '</header>'
		+ '<section class="todoBody">'
		+ 	'<ul></ul>'
		+ '</section>'
	),
	events: {
		'keypress header input': 'eventInputEnter'
	},
	initialize: function(){
		var html = this.template();
		this.$el.append(html);
		var doms = this.doms = {};
		doms.input = this.$el.find('header input');
		doms.body = this.$el.find('section ul');


		this.listenTo(this.collection, 'add', this.addOne);
	},
	render: function(){
		this.addAll();
		return this;
	},
	eventInputEnter: function(ev, testing){
		if (ev.keyCode != 13 && !testing) return;
		if (!this.doms.input.val()) return;

		this.collection.add({title: this.doms.input.val()});

		this.doms.input.val('');
	},
	addAll: function(){
		this.collection.each(this.addOne, this);
	},
	addOne: function(todo){
		var item = new app.TodoItem({model: todo});
		this.doms.body.append(item.render().el);
	}
})

