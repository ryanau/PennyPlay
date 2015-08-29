var React = require('react');
var $ = require('jquery');

var SignUp = React.createClass({
	getInitialState: function () {
		return {
			email: null,
			password: null,
		}
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
		}
		$.ajax({
			url: 'http://localhost:3000/users',
			type: 'POST',
			data: data,
			dataType: 'json',
			crossDomain: true,
			headers: {'Authorization': sessionStorage.getItem('jwt'),
			},
			success: function () {
				console.log('signed up')
			},
		});
	},
  render: function () {
    return (
    	<div>
	      <h1>SignUp</h1>
	      <p>Email: <input onChange={this.handleEmail} value={this.state.email} /></p>
	      <p>Password: <input onChange={this.handlePassword} value={this.state.password} /></p>
	      <button onClick={this.handleSubmit}>Sign Up</button>
      </div>
    );
  }
});

module.exports = SignUp;