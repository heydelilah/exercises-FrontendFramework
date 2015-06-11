
var MessageBox = React.createClass({
	handleDelete: function(message){
		var datas = this.state.messages;
		var formatedVals = []
		for (var i = 0; i < datas.length; i++) {
			if(datas[i] != message){
				formatedVals.push(datas[i])
			}
		};
		this.setState({messages: formatedVals})
	},
	handleAdd: function(e){
		var inputCon = this.refs.newMessage.getDOMNode();
		var val = inputCon.value;
		var updatedMessages = this.state.messages.concat([val]);
		this.setState({messages:updatedMessages});

	},
	getInitialState:function() {
		return {
			isShow: true,
			title: 'hello word',
			messages: [
				'eat dinner',
				'shopping',
				'running'
			]
		}
	},
	render: function(){
		var inlineStyle = {'display': this.state.isShow ? 'block' : 'none'};
		
		var self = this;
		var group = this.state.messages.map(function(val){
			return <SubMessageBox message={val} onDelete={self.handleDelete} />
		});

		return (
			<div style={inlineStyle}>
				<h1> {this.state.title} </h1>
				<input type="text" ref="newMessage" />
				<button className="btn" onClick={this.handleAdd} >Add</button>
				{group}
			</div>
		);
	}
});

var SubMessageBox = React.createClass({
	handleDelete: function(){
		this.props.onDelete(this.props.message)
	},
	// 验证
	propTypes: {
		message: React.PropTypes.string.isRequired
	},

	render: function(){
		return (
			<div>
				<span>{this.props.message}</span>
				<button onClick={this.handleDelete}>X</button>
			</div>);
	}
})

var reactComponent = React.render(
	<MessageBox />,
	document.getElementById('demo')
)
