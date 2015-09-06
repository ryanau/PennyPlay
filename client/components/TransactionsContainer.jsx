var React = require('react');
var $ = require('jquery');

TransactionsContainer = React.createClass({
  render: function () {
  	var entries = this.props.entries;
    return (
    	<div>
	      <h4>Past Transactions</h4>
	      {entries}
      </div>
    );
  }
});

module.exports = TransactionsContainer;