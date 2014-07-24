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
	}
})

app.TodoItems = Backbone.View.extend({
	tagName: "ul",
	render: function(){
		this.addAll();
		return this;
	},
	addAll: function(){
		this.collection.each(this.addOne, this);
	},
	addOne: function(todo){
		var item = new app.TodoItem({model: todo});
		this.$el.append(item.render().el);
	}
})

