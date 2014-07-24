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

	});
});