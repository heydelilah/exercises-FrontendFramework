var React = require('react');

var AddBtn = require('./component/addbutton');
var FeedForm = require('./component/feedform');
var FeedList = require('./component/feedlist');


var App = React.createClass({
	getInitialState:function() {
		return {
			listData: [
				{title:'heydelila', content:'i am form china', number: 24},
				{title:'ice', content:'where are you', number: 14}
			]
		}
	},
	render: function(){
		return (
			<div>
				<h1 className="text-center"> Voteit </h1>
		
				<AddBtn />

				<FeedForm />

				<FeedList data={this.state.listData} />
			</div>
		)
	}
})


var app = React.render(
	<App/>,
	document.getElementById('feed')
);