var React = require('react');
var $ = require('jquery');

BetsContainer = React.createClass({
	getInitialState: function () {
		return {
			data: '',
		}
	},
	componentDidMount: function() {
	  this.run();
	},

	run: function () {
		$.ajax({
			url: 'http://localhost:3000/bets',
			type: 'GET',
			dataType: 'json',
			crossDomain: true,
			headers: {'Authorization': sessionStorage.getItem('jwt'),
			},
			success: function (bets) {
				this.setState({
					data: bets,
				});
				console.log('done');
			}.bind(this),
		});
	},

  render: function () {
    return (
    	<div>
	      <h1>Bets!</h1>
	      {this.state.data}
      </div>
    );
  }
});

module.exports = BetsContainer;