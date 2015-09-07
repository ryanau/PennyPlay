var React = require('react');
var $ = require('jquery');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = mui.FlatButton;
var RaisedButton = mui.RaisedButton;
var Dialog = mui.Dialog;
var TextField = mui.TextField;
var Snackbar = mui.Snackbar;

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
					this.refs.newBetNotification.show();
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
	  		return (
	  			<BetContainer key={bet.id} bet={bet} origin={this.props.origin} currentUser={this.props.currentUser} refresh={this.refresh}/>
	  		);
	  	}.bind(this));
	  } else if (this.state.bets === null) {
  		var bets = "Loading..."
  	} else {
	  	var bets = "You have no bets. Click New Bet to get started!"
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
	      {newBetDialog}
	      <Snackbar
	      	ref="newBetNotification"
	        message='Bet Created'
	        autoHideDuration={2000}/>
	      <span />
	      <RaisedButton
	        label="New Bet"
	        onClick={this.openModal}
	        secondary={true}/>
	      <div className="betContainer">
		      {bets}
	      </div>
      </div>
    );
  }
});

module.exports = BetsContainer;