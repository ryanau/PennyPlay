var React = require('react');
var $ = require('jquery');

var BetsContainer = require('./BetsContainer.jsx')

Dashboard = React.createClass({
  render: function () {
    return (
    	<div>
	      <h1>Dashboard</h1>
	      <h4>Welcome Back {this.props.currentUser.first_name}!</h4>
	      <img src={this.props.currentUser.pic} alt="Profile Pic" height="42" width="42" />
	      <BetsContainer currentUser={this.props.currentUser} origin={this.props.origin}/>
      </div>
    );
  }
});

module.exports = Dashboard;