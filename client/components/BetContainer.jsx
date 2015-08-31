var React = require('react');
var $ = require('jquery');

var TransactionsContainer = require('./TransactionsContainer.jsx')

BetContainer = React.createClass({
  render: function () {
    var bet = this.props.bet
    var transactions = bet.transactions.map(function (transaction, index) {
      return (
        <TransactionsContainer origin={this.props.origin} key={transaction.id} transaction={transaction} />
      );
    }.bind(this));
    return (
    	<div>
	      <h3>Bet</h3>
	      <p>Name: {bet.name}</p>
        {transactions}
      </div>
    );
  }
});

module.exports = BetContainer;
