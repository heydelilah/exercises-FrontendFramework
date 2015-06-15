var React = require('react');

var FeedItem = React.createClass({
	render: function(){
		/**
		 *  props: 
		 * 		data
		 *  method:
		 *  	onVote()
		 */

		var data = this.props.data;

		var voteStyle = data.number >= 0 ? 'badge badge-success' : 'badge badge-danger';

		return (
			<li className="list-group-item container"> 
				<div className="fl">
					<h4> {data.title} </h4>
					<div className="color-grey"> {data.desc} </div>
				</div>

				<div className="fr text-right">
					<span className={ voteStyle }>{data.number} </span>
					<div>
						<span className="arrowCon glyphicon glyphicon-arrow-up" onClick={this.eventVoteUp}>
						</span>
						<span className="arrowCon glyphicon glyphicon-arrow-down" onClick={this.eventVoteDown}>
						</span>
					</div>
				</div>
			</li>
		);	
	},
	eventVoteDown: function(){
		var count = this.props.data.number;
		var result = count-1;
		this.vote(result);
	},
	eventVoteUp: function(){
		var count = this.props.data.number;
		var result = count+1;
		this.vote(result);
	},
	vote: function(number){
		var data = this.props.data;

		this.props.onVote({
			'id': data.id,
			'number': number
		});
	}
})


module.exports = FeedItem;