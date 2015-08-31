var React = require('react');
var SignUp = require('./SignUp.jsx');
var LogIn = require('./LogIn.jsx');
var Router = require('react-router');
var Link = Router.Link;

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = mui.FlatButton;

Landing = React.createClass({
	childContextTypes: {
	  muiTheme: React.PropTypes.object
	},

	getChildContext: function () {
	  return {
	    muiTheme: ThemeManager.getCurrentTheme()
	  };
	},
  render: function () {
    return (
    	<div>
	      <h1>Welcome</h1>
	      <FlatButton
	        containerElement={<Link to="/signup" />}
	        linkButton={true}
	        label={('no', 'Sign in')}/> 
	      <FlatButton
	        containerElement={<Link to="/login" />}
	        linkButton={true}
	        label={('no', 'Log In')}/> 
      </div>
    );
  }
});

module.exports = Landing;