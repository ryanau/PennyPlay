var React = require('react');
var $ = require('jquery');

TransactionsContainer = React.createClass({
	getInitialState: function () {
		return {
			entries: null,
		}
	},
	loadEnties: function () {
		var data = {
		  bet_id: this.props.bet.id,
		}
		$.ajax({
		  url: this.props.origin + '/entries',
		  type: 'POST',
		  data: data,
		  dataType: 'json',
		  crossDomain: true,
		  headers: {'Authorization': sessionStorage.getItem('jwt'),
		  },
		  success: function (data) {
		    this.setState({
		    	entries: data.entries
		    })
		  }.bind(this),
		  error: function(error) {
		    window.location = "/"
		  }.bind(this),
		});
	},
  render: function () {
  	var entries = this.state.entries;
    return (
    	<div>
	      <h4>Past Entries</h4>
	      {entries}
      </div>
    );
  }
});

module.exports = TransactionsContainer;