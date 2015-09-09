var React = require('react');
var $ = require('jquery');

TransactionsContainer = React.createClass({
	getInitialState: function () {
		return {
			entries: null,
		}
	},
	componentDidMount: function () {
		this.loadEnties();
	},
	loadEnties: function () {
		var data = {
		  bet_id: this.props.bet.id,
		}
		$.ajax({
		  url: this.props.origin + '/entries',
		  type: 'GET',
		  data: data,
		  dataType: 'json',
		  crossDomain: true,
		  headers: {'Authorization': localStorage.getItem('jwt'),
		  },
		  success: function (data) {
		    this.setState({
		    	entries: data
		    })
		    console.log(data)
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