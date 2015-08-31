var React = require('react');
var $ = require('jquery');

TransactionsContainer = React.createClass({
  render: function () {
  	var transaction = this.props.transaction;
    return (
    	<div>
	      <h4>Past Transactions</h4>
	      <p>Winner: {transaction.winner_id}</p>
	      <p>Loser: {transaction.loser_id}</p>
      </div>
    );
  }
});

module.exports = TransactionsContainer;