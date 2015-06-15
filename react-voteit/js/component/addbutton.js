var React = require('react');

var AddBtn = React.createClass({
	
	/**
	 * attr:
	 * 		isShowBtn
	 * method:
	 * 		onButtonClick() -传回给父层
	 */
		
	render: function(){
		var isShow = this.props.isShowBtn;

		var style = isShow ? "btn btn-default btn-block" : "btn btn-success btn-block";
		var text = isShow ? "Cancel" : "Create New Item";

		return (
			<div className="container">
				<button className={ style } onClick={ this.props.onButtonClick }> 
					{text}
				</button>	
			</div>
		)
	}
})

module.exports = AddBtn;
