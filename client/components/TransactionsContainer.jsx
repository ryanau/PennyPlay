var React = require('react');
var $ = require('jquery');

TransactionsContainer = React.createClass({
  render: function () {
  	var entry = this.props.entry;
    return (
    	<div>
	      <h4>Past Transactions</h4>
	      {entry}
      </div>
    );
  }
});

module.exports = TransactionsContainer;