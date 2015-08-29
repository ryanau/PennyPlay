var React = require('react');
var SignUp = require('./SignUp.jsx');
var LogIn = require('./LogIn.jsx');

Landing = React.createClass({
  render: function () {
    return (
    	<div>
	      <h1>Welcome</h1>
	      <SignUp readFromAPI={this.props.readFromAPI} writeToAPI={this.props.writeToAPI} origin={this.props.origin}/>
	      <LogIn readFromAPI={this.props.readFromAPI} writeToAPI={this.props.writeToAPI} origin={this.props.origin}/>
      </div>
    );
  }
});

module.exports = Landing;