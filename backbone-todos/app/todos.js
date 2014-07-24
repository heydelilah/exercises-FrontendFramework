window.app = {};

app.Todo = Backbone.Model.extend({
	defaults: {
		title: "",
		done: false
	}
});

app.TodoList = Backbone.Collection.extend({
	model: app.Todo
})

app.TodoView = Backbone.view.extend({
	tagName: "li"
})


