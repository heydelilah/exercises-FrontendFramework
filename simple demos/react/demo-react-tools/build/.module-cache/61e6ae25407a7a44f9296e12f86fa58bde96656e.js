
var MessageBox = React.createClass({displayName: "MessageBox",
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
			return React.createElement(SubMessageBox, {message: val, onDelete: self.handleDelete})
		});

		return (
			React.createElement("div", {style: inlineStyle}, 
				React.createElement("h1", null, " ", this.state.title, " "), 
				React.createElement("input", {type: "text", ref: "newMessage"}), 
				React.createElement("button", {className: "btn", onClick: this.handleAdd}, "Add"), 
				group
			)
		);
	}
});

var SubMessageBox = React.createClass({displayName: "SubMessageBox",
	handleDelete: function(){
		this.props.onDelete(this.props.message)
	},
	// 验证
	propTypes: {
		message: React.PropTypes.string.isRequired
	},

	render: function(){
		return (
			React.createElement("div", null, 
				React.createElement("span", null, this.props.message), 
				React.createElement("button", {onClick: this.handleDelete}, "X")
			));
	}
})

var reactComponent = React.render(
	React.createElement(MessageBox, null),
	document.getElementById('demo')
)
