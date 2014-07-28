describe('Todos', function () {
	describe('Todo Model', function () {
		describe('Init', function () {

			beforeEach(function () {
				this.todo = new app.Todo();
			});

			it('should default the title to an ampty string', function () {
				this.todo.get('title').should.equal('');
			});

			it('should default the status to false', function () {
				this.todo.get('done').should.be.false;
			});
		});
		describe('Attributes', function () {
			beforeEach(function () {
				this.todo = new app.Todo();
			});

			it('should support setting the title', function () {
				this.todo.set('title', 'testing');
				this.todo.get('title').should.equal('testing');
			});

			it('should support setting the done', function () {
				this.todo.set('done', true);
				this.todo.get('done').should.be.true;
			});
		});
	});

	describe('Todo Collection', function () {
		it("should support explicit initialization with multiple todos", function() {
			this.todos = new app.Todos([
				{title: "Todo 1"},
				{title: "Todo 2"}
			]);
			this.todos.length.should.equal(2);
		})
	});

	describe('Todo View', function () {
		beforeEach(function () {
			this.todo = new app.Todo({
				title: 'ming'
			});

			this.item = new app.TodoItem({model: this.todo});
		});

		it('call render() method, should return the view-model instance', function () {
			this.item.render().should.equal(this.item);
		});

		it('should render as a list item', function () {
			this.item.render().el.nodeName.should.equal('LI');
		});

		describe('Template', function () {
			beforeEach(function () {
				this.item.render();
			});

			it("should contain the todo title as text", function() {
				this.item.$el.text().should.have.string("ming");
			})
			it("should include a label for the status", function() {
				this.item.$el.find("label").should.have.length(1);
			})
			it("should include an <input> checkbox", function() {
				this.item.$el.find("label>input[type='checkbox']").should.have.length(1);
			})
			it("should be clear by default (for 'pending' todos)", function() {
				this.item.$el.find("label>input[type='checkbox']").is(":checked").should.be.false;
			})
			it("should be set for 'done' todos", function() {
				this.todo.set("done", true);
				this.item.render();
				this.item.$el.find("label>input[type='checkbox']").is(":checked").should.be.true;
			})
			it("should protect against XSS attacks on the title", function() {
				this.badTodo = new app.Todo({title: "<script>bad</script>"});
				this.badItem = new app.TodoItem({model: this.badTodo});
				this.badItem.render();
				$("label",this.badItem.$el).html().replace(/<input .*>/,"").trim()
					.should.equal("&lt;script&gt;bad&lt;/script&gt;");
			})
		});

		describe("Model Interaction", function() {
			it("should update model when checkbox clicked", function() {
				$("<div>").attr("id","fixture").css("display","none").appendTo("body");
				this.item.render();
				$("#fixture").append(this.item.$el);
				this.item.$el.find("input").click();
				this.todo.get('done').should.be.true;
				$("#fixture").remove();
			})
		})
	});

	describe('Todos View', function () {
		beforeEach(function(){
			this.todos = new app.Todos([
				{title: "Todo 1"},
				{title: "Todo 2"}
			]);
			this.list = new app.TodoItems({collection: this.todos});
		});

		it("render() should return the view object", function() {
			this.list.render().should.equal(this.list);
		});

		it("should render as an DIV which has the id #todo", function() {
			this.list.render();
			this.list.el.nodeName.should.equal("DIV");
			this.list.$el.attr('id').should.equal('todo')
		});

		it("should include list items for all models in collection", function() {
			this.list.render();
			this.list.$el.find("li").should.have.length(2);
		});
	});

	describe('Interaction', function () {
		beforeEach(function () {
			$("<div>").attr("id","fixture").css("display","block").appendTo("body");
			this.todos = new app.Todos([
				{title: "Todo 1"},
				{title: "Todo 2"}
			]);
			this.list = new app.TodoItems({collection: this.todos});
			this.list.render();
			$("#fixture").append(this.list.$el);
		});

		afterEach(function () {
			$("#fixture").remove();
		});

		it('should able to add new todo item', function () {
			var input = $("#fixture header input");
			input.val('faii');
			input.trigger('keypress',true);
			this.todos.pop().get('title').should.equal('faii');
		});

		it('should be change style when click the item', function () {
			var item = $("#fixture .todoBody label");
			item.find('input').click();
			item.hasClass('delete').should.be.true;
		});
	});

	describe('Cache datas', function () {
		beforeEach(function () {
			$("<div>").attr("id","fixture").css("display","block").appendTo("body");
			this.todos = new app.Todos([
				{title: "Todo 1"},
				{title: "Todo 2"}
			]);
			this.list = new app.TodoItems({collection: this.todos});
			this.list.render();
			$("#fixture").append(this.list.$el);
		});

		afterEach(function () {
			$("#fixture").remove();
		});
		it('should support cache datas when init', function () {
			this.list.data.length.should.equal(2);
		});
		it('should support cache datas when after added a new item', function () {
			var input = $("#fixture header input");
			input.val('faii');
			input.trigger('keypress',true);
			this.list.data.length.should.equal(3);
		});
	});

	describe('Filter Items', function () {
		beforeEach(function () {
			$("<div>").attr("id","fixture").css("display","block").appendTo("body");
			this.todos = new app.Todos([
				{title: "It is done", done: true},
				{title: "It is doing 1", done: false},
				{title: "It is doing 2", done: false}
			]);
			this.list = new app.TodoItems({collection: this.todos});
			this.list.render();
			$("#fixture").append(this.list.$el);
		});

		afterEach(function () {
			$("#fixture").remove();
		});

		it('should support filter the undone item', function () {
			var label = $('#fixture .todoFilter span[data-type="undone"]');
			label.click();
			var results = this.todos.toJSON();
			results.length.should.equal(2);
			results[0].title.should.equal('It is doing 1');
			results[0].done.should.be.false;
		});
		it('should support filter the done item', function () {
			var label = $('#fixture .todoFilter span[data-type="done"]');
			label.click();
			var results = this.todos.toJSON();
			results.length.should.equal(1);
			results[0].title.should.equal('It is done');
			results[0].done.should.be.true;
		});
		it('should support recover to the all item', function () {
			var done = $('#fixture .todoFilter span[data-type="done"]');
			done.click();
			var all = $('#fixture .todoFilter span[data-type="all"]');
			all.click();
			var results = this.todos.toJSON();
			results.length.should.equal(3);
			results[0].title.should.equal('It is done');
			results[0].done.should.be.true;
		});
	});

});