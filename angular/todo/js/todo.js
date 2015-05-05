var DATA = [
	{title: 'dinner', done: false},
	{title: 'shopping', done: true},
	{title: 'sleeping', done: false},
	{title: 'reading', done: false}
];



angular.module('todoApp', []).controller('todoController', function(){

	// todo items
	this.items = DATA;

	this.currentItems = null;


	this.getAmount = function(){
		return this.currentItems.length;
	};

	this.type = 'todo';

	this.isTodo = function(){
		this.type = 'todo';
		this.update();
	}
	this.isDone = function(){
		this.type = 'done';
		this.update();
	}
	this.isAll = function(){
		this.type = 'all';
		this.update();
	}


	this.update = function(){
		var type = this.type;
		var allItems = this.items;

		var result = [];
		var i = 0;

		switch(type){
			case 'all':
				result = allItems;
			break;
			case 'done':
				for(i = 0; i<allItems.length; i++){
					if(allItems[i].done){
						result.push(allItems[i]);
					}
				}
			break;
			case 'todo':
				for(i = 0; i<allItems.length; i++){
					if(!allItems[i].done){
						result.push(allItems[i]);
					}
				}
			break;
		}

		this.currentItems = result;
	};

	this.eventKeypress = function(ev){
		if(ev.keyCode === 13){
			this.eventAdd();
		}
	}

	this.eventAdd = function(){
		this.items.push({
			'title': this.newTodo,
			'done': false
		});
		this.newTodo = '';
		this.update();
	}

	this.update();

});