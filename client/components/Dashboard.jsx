var React = require('react');
var $ = require('jquery');

var BetsContainer = require('./BetsContainer.jsx')

Dashboard = React.createClass({
  render: function () {
    return (
    	<div>
	      <h1>Dashboard</h1>
	      <BetsContainer origin={this.props.origin}/>
      </div>
    );
  }
});

module.exports = Dashboard;