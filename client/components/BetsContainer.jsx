var React = require('react');
var $ = require('jquery');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = mui.FlatButton;
var Dialog = mui.Dialog;
var TextField = mui.TextField;

var BetContainer = require('./BetContainer.jsx')

BetsContainer = React.createClass({
	childContextTypes: {
	  muiTheme: React.PropTypes.object
	},

	getChildContext: function () {
	  return {
	    muiTheme: ThemeManager.getCurrentTheme()
	  };
	},
	getInitialState: function () {
		return {
			bets: 0,
			betName: null,
		}
	},
	componentDidMount: function() {
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
			error: function(error) {
				window.location = "/"
			}.bind(this),
		});
	},
	updateBetName: function (e) {
		this.setState({
			betName: e.target.value,
		})
	},
	openModal: function () {
		this.refs.newBetDialog.show();
	},
	closeModal: function () {
		this.refs.newBetDialog.dismiss();
	},
	refresh: function () {
		console.log('refresh')
		this.loadBets();
	},
	handleCreateBet: function () {
		var data = {
			name: this.state.betName.toUpperCase(),
		};
		if (data.name.length > 0) {
			$.ajax({
				url: this.props.origin + '/bets',
				type: 'POST',
				data: data,
				dataType: 'json',
				crossDomain: true,
				headers: {'Authorization': sessionStorage.getItem('jwt'),
				},
				success: function (data) {
					this.refs.newBetDialog.dismiss();
					this.loadBets();
				}.bind(this),
				error: function(error) {
				  window.location = "/"
				}.bind(this),
			});
		}
	},
  render: function () {  	
  	if (this.state.bets != 0) {
	  	var bets = this.state.bets.map(function (bet, index) {
	  		console.log(bet)
	  		return (
	  			<BetContainer key={bet.id} bet={bet} origin={this.props.origin} currentUser={this.props.currentUser} refresh={this.refresh}/>
	  		);
	  	}.bind(this));
	  } else if (this.state.bets === null) {
  		var bets = "Loading..."
  	} else {
	  	var bets = "You have no bets. Click create to get started!"
  	};
  	var DialogAction = [
  		<div>
  		<FlatButton
  		  label="Cancel"
  		  onClick={this.closeModal}/>
  		<FlatButton
  		  label="Create Bet"
  		  onClick={this.handleCreateBet}/> 
  		</div>
  	]
  	var newBetDialog =
  		<Dialog
  			ref="newBetDialog"
  			title="New Bet"
  			actions={DialogAction}
  			modal={false}>
	  		<TextField
	  			onChange={this.updateBetName}
	  		  floatingLabelText="Bet Name" 
	  		  hintText="Required"/>
  		</Dialog>
    return (
    	<div>
	      <h2>Bets</h2>
	      {newBetDialog}
	      <FlatButton
	        label="New Bet"
	        onClick={this.openModal}/>
	      <p>{bets}</p>
      </div>
    );
  }
});

module.exports = BetsContainer;