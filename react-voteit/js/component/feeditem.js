var React = require('react');

var FeedItem = React.createClass({
	render: function(){

		var data = this.props.data;

		return (
			<li className="list-group-item container"> 
				<div className="fl">
					<h4> {data.title} </h4>
					<div className="color-grey"> {data.content} </div>
				</div>

				<div className="fr text-right">
					<div> {data.number} </div>
					<div>
						<span className="arrowCon glyphicon glyphicon-arrow-up"></span>
						<span className="arrowCon glyphicon glyphicon-arrow-down"></span>
					</div>
				</div>
			</li>
		);	
	}
})


module.exports = FeedItem;