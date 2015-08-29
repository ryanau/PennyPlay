var React = require('react');
var $ = require('jquery');

var LogIn = React.createClass({
	getInitialState: function () {
		return {
			email: null,
			password: null,
		}
	},
	componentDidMount: function() {
		// this.handleClick();
	},
	handleEmail: function (e) {
		this.setState({
			email: e.target.value
		})
	},
	handlePassword: function (e) {
		this.setState({
			password: e.target.value
		})
	},
	handleSubmit: function (e) {
		e.preventDefault();
		var data = {
			email: this.state.email,
			password: this.state.password,
		};
		$.ajax({
			url: 'http://localhost:3000/login',
			type: 'POST',
			data: data,
			dataType: 'json',
			crossDomain: true,
			headers: {'Authorization': sessionStorage.getItem('jwt'),
			},
			success: function (data) {
				if (data.message === "logged in") {
					console.log(data.token)
					sessionStorage.setItem('jwt', data.token)
				} else {
					alert('Log In Failed');
				};
			},
		});
	},
	handleClick: function (e) {
		e.preventDefault();
		this.props.readFromAPI(this.props.origin + '/users', function(blabs) {
		}.bind(this));
	},
  render: function () {
    return (
    	<div>
	      <h1>Log In</h1>
	      <p>Email: <input onChange={this.handleEmail} value={this.state.email} /></p>
	      <p>Password: <input onChange={this.handlePassword} value={this.state.password} /></p>
	      <button onClick={this.handleSubmit}>Log In</button>
	      <button onClick={this.handleClick}>Click</button>
      </div>
    );
  }
});

module.exports = LogIn;