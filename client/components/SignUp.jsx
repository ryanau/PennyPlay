var React = require('react');
var $ = require('jquery');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = mui.FlatButton;

var SignUp = React.createClass({
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
			signedUp: false,
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
			url: this.props.origin + '/users',
			type: 'POST',
			data: data,
			dataType: 'json',
			crossDomain: true,
			headers: {'Authorization': sessionStorage.getItem('jwt'),
			},
			success: function () {
				this.setState({
					signedUp: true,
				})
				console.log('signed up')
			}.bind(this),
		});
	},
  render: function () {
  	if (!this.state.signedUp) {
	  	var signUpBox = (
  			<div>
		      <h1>SignUp</h1>
		      <p>Email: <input onChange={this.handleEmail} value={this.state.email} /></p>
		      <p>Password: <input onChange={this.handlePassword} value={this.state.password} /></p>
		      <button onClick={this.handleSubmit}>Next</button>
		    </div>
	  	)
  	} else {
  		var signUpBox = (
  			<div>
  				<FlatButton label="Authorize Venmo Account" linkButton={true} href="https://github.com/callemall/material-ui" />
  			</div>
  		)
  	}
    return (
    	<div>
    		{signUpBox}
      </div>
    );
  }
});

module.exports = SignUp;