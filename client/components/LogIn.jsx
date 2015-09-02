var React = require('react');
var $ = require('jquery');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = mui.FlatButton;

var LogIn = React.createClass({
	childContextTypes: {
	  muiTheme: React.PropTypes.object
	},

	getChildContext: function () {
	  return {
	    muiTheme: ThemeManager.getCurrentTheme()
	  };
	},
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
			url: this.props.origin + '/login',
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
					window.location = this.props.origin + "/dashboard"
				} else {
					alert('Log In Failed');
				};
			}.bind(this),
		});
	},
	handleLogOut: function (e) {
		e.preventDefault();
		sessionStorage.setItem('jwt','')
		alert('Logged Out')
	},
	handleLogIn: function () {
		e.preventDefault();
		$.ajax({
			url: "https://api.venmo.com/v1/oauth/authorize?client_id=<client_id>&scope=<scopes>",
			type: 'GET',
			data: data,
			dataType: 'json',
			crossDomain: true,
			headers: {'Authorization': sessionStorage.getItem('jwt'),
			},
			success: function (data) {
				if (data.message === "logged in") {
					console.log(data.token)
					sessionStorage.setItem('jwt', data.token)
					window.location = this.props.origin + "/dashboard"
				} else {
					alert('Log In Failed');
				};
			}.bind(this),
		});
	},
  render: function () {
    return (
    	<div>
	      <h1>Log In</h1>
	      <p>Email: <input onChange={this.handleEmail} value={this.state.email} /></p>
	      <p>Password: <input onChange={this.handlePassword} value={this.state.password} /></p>
	      <button onClick={this.handleSubmit}>Log In</button>
	      <button onClick={this.handleLogOut}>Log Out</button>
	      <div>
	      	<FlatButton label="Authorize Venmo Account" onClick={this.handleLogIn} />
	      </div>
      </div>
    );
  }
});

module.exports = LogIn;