var React = require('react');

var FeedForm = React.createClass({
	/**
	 *  props:
	 * 		styles
	 * 	refs:
	 * 		title,
	 * 		desc,
	 * 		form
	 * 	method:
	 * 		onNewItem
	 */
	render: function(){

		var display = this.props.isShowForm ? 'block' : 'none';
		var styles = {display: display};

		return (
			<form ref="form" style={styles} className="container" onSubmit={this.eventSubmit}>
				<div className="form-group">
					<input ref="title" type="text" className="form-control" placeholder="Title" />
					<input ref="desc" type="text" className="form-control" placeholder="Content" />
					<button type="submit" className="btn btn-primary btn-block"> Add </button>
				</div>
			</form>
		);	
	},
	eventSubmit: function(e){
		e.preventDefault();

		var refs = this.refs;

		var newItem = {
			'title': refs.title.getDOMNode().value,
			'desc': refs.desc.getDOMNode().value
		};

		refs.form.getDOMNode().reset();

		this.props.onNewItem(newItem);
	}
})


module.exports = FeedForm;