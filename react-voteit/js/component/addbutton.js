var React = require('react');

var AddBtn = React.createClass({
	render: function(){
		return (
			<div className="container">
				<button className="btn btn-success btn-block"> Create New Item </button>	
			</div>
		)
	}
})

module.exports = AddBtn;
