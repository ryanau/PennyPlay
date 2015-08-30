var React = require('react');
var $ = require('jquery');

Bet = React.createClass({
  render: function () {
  	var bet = this.props.bet
    return (
    	<div>
	      <h3>Bet</h3>
	      <p>Name: {bet.name}</p>
	      <h4>Previous Transactions</h4>
	      <p>Winner: {bet.transactions[0].winner_id}</p>
	      <p>Loser: {bet.transactions[0].loser_id}</p>
      </div>
    );
  }
});

module.exports = Bet;