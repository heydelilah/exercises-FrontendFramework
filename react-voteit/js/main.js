var React 		= require('react'),
	AddBtn 		= require('./component/addbutton'),
	FeedForm 	= require('./component/feedform'),
	FeedList 	= require('./component/feedlist'),
	_			= require('lodash'),
	// Firebase 	= require('firebase');


var App = React.createClass({
	getInitialState:function() {
		// var ref = new Firebase('https://react-vote.firebaseio.com/');

		
		return {
			items: [
				{id:1, title:'heydelila', content:'i am form china', number: 24},
				{id:2, title:'ice', content:'where are you', number: 14}
			],
			isShowBtn: false
		}
	},
	render: function(){
		var states = this.state;

		return (
			<div>
				<h1 className="text-center"> Voteit </h1>
		
				<AddBtn isShowBtn={states.isShowBtn} onButtonClick={this.eventToggleForm} />

				<FeedForm isShowForm={states.isShowBtn} onNewItem = {this.eventNewItem}/>

				<FeedList data={states.items} onVote={this.eventVote}/>
			</div>
		)
	},
	eventToggleForm: function(){
		this.setState({
			isShowBtn: !this.state.isShowBtn
		})
	},
	eventNewItem: function(data){
		var updatedData = this.state.items.concat([data]);
		updatedData.id = updatedData.length;
		
		this.setState({
			items: updatedData,
			isShowBtn: false
		})
	},
	eventVote: function(result){
		var items = this.state.items.slice();

		var index = _.findIndex(items, {id: result.id});
		var data = items[index];

		result.title = data.title;
		result.content = data.content;

		items = _.pull(items, data);
		items.push(result);

		this.setState({
			items: items
		})
	}
})


var app = React.render(
	<App/>,
	document.getElementById('feed')
);