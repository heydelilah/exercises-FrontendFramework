var React = require('react');
var FeedItem = require('./feeditem');

var FeedList = React.createClass({
	render: function(){
		var data = this.props.data;

		var listItems = [];
		for (var i = 0; i < data.length; i++) {
			listItems.push(<FeedItem data={data[i]} />)
		};

		return (
			<ul className="list-group"> {listItems}	</ul>
		)
	}
})


module.exports = FeedList;