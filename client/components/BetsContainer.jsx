var React = require('react');
var $ = require('jquery');

var BetContainer = require('./BetContainer.jsx')

BetsContainer = React.createClass({
	getInitialState: function () {
		return {
			bets: null,
		}
	},
	componentDidMount: function() {
		console.log('loading')
	  this.loadBets();
	},

	loadBets: function () {
		$.ajax({
			url: this.props.origin + '/bets',
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
	  			<BetContainer key={bet.id} bet={bet} origin={this.props.origin}/>
	  		);
	  	}.bind(this));
  	} else {
  		var bets = "Loading..."
  	};
    return (
    	<div>
	      <h2>Bets</h2>
	      {bets}
      </div>
    );
  }
});

module.exports = BetsContainer;