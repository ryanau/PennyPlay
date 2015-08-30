var React = require('react');
var $ = require('jquery');

var Bet = require('./Bet.jsx')

BetsContainer = React.createClass({
	getInitialState: function () {
		return {
			bets: null,
		}
	},
	componentDidMount: function() {
	  this.loadBets();
	},

	loadBets: function () {
		$.ajax({
			url: 'http://localhost:3000/bets',
			type: 'GET',
			dataType: 'json',
			crossDomain: true,
			headers: {'Authorization': sessionStorage.getItem('jwt'),
			},
			success: function (bets) {
				this.setState({
					bets: bets,
				});
				console.log('done');
			}.bind(this),
		});
	},

  render: function () {
  	if (this.state.bets != null) {
	  	var bets = this.state.bets.map(function (bet, index) {
	  		return (
	  			<Bet key={bet.id} bet={bet} />
	  		);
	  	}.bind(this));
  	} else {
  		var bets = "Loading..."
  	}
    return (
    	<div>
	      <h1>Bets</h1>
	      {bets}
      </div>
    );
  }
});

module.exports = BetsContainer;