var React 		= require('react'),
	AddBtn 		= require('./component/addbutton'),
	FeedForm 	= require('./component/feedform'),
	FeedList 	= require('./component/feedlist'),
	_			= require('lodash'),
	Firebase 	= require('firebase');


var App = React.createClass({
	loadData: function(){
		var ref = new Firebase('https://react-vote.firebaseio.com/');

		var self = this;
		
		ref.on('value', function(snap){
			var items = [];

			snap.forEach(function(snapshot){

				var value = snapshot.val();
				value.id = snapshot.key();

				items.push(value);
			})

			var sorted = _.sortBy(items, function(n){
				return -n.number;
			});
			
			self.setState({
				'items': sorted,
				'isShowBtn': false
			})
		});

	},
	componentDidMount: function(){
		this.loadData();
	},
	getInitialState:function() {
		return {
			items: [],
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
		var ref = new Firebase('https://react-vote.firebaseio.com/');
		ref.push(data);
	},
	eventVote: function(result){
		var ref = new Firebase('https://react-vote.firebaseio.com/');
		ref = ref.child(result.id);
		ref.update(result);
	}
})


var app = React.render(
	<App/>,
	document.getElementById('feed')
);