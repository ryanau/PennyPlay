var React = require('react');
var $ = require('jquery');

var BetsContainer = require('./BetsContainer.jsx')

Dashboard = React.createClass({
  render: function () {
    return (
    	<div>
	      <h4 className="Ta-c" style={{color: "#000000", fontFamily: 'Lato', fontWeight: "300", fontSize: "32px"}}>Welcome Back {this.props.currentUser.first_name}!</h4>
	      <BetsContainer currentUser={this.props.currentUser} origin={this.props.origin}/>
      </div>
    );
  }
});

module.exports = Dashboard;