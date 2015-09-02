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
	handleCreateBet: function () {
		var data = {
			name: this.state.betName,
		};
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
				window.location = this.props.origin + "/dashboard"
			}.bind(this),
		});
	},
  render: function () {  	if (this.state.bets != 0) {
	  	var bets = this.state.bets.map(function (bet, index) {
	  		return (
	  			<BetContainer key={bet.id} bet={bet} origin={this.props.origin}/>
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
  			modal={true}>
  		<TextField
  			onChange={this.updateBetName}
  		  floatingLabelText="Bet Name" />
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