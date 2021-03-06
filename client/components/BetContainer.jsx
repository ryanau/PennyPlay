var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');
var Users = require('../users.js');
var TransactionsContainer = require('./TransactionsContainer.jsx');
var SearchModal = require('./SearchModal.jsx');
var TransactionModal = require('./TransactionModal.jsx');
var PendingTransaction = require('./PendingTransaction.jsx');
var BetStats = require('./BetStats.jsx');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = mui.FlatButton;
var Dialog = mui.Dialog;
var Card = mui.Card;
var CardHeader = mui.CardHeader;
var CardText = mui.CardText;
var CardActions = mui.CardActions;
var CardTitle = mui.CardTitle;
var Avatar = mui.Avatar;
var Snackbar = mui.Snackbar;
var FontIcon = mui.FontIcon;
var IconButton = mui.IconButton;

BetContainer = React.createClass({
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
      usersBasket: new Users,
      pending: false,
      winners: null,
      losers: null,
      users: null,
    }
  },
  componentDidMount: function(){
    this.state.usersBasket.on('change', this.usersChanged);
    this.loadPendingTransaction();
    this.loadUsers();
  },
  componentWillUnmount: function(){
    this.state.usersBasket.off('change');
  },
  usersChanged: function(){
    this.forceUpdate();
  },
  newTransaction: function () {
    var data = {
      bet_id: this.props.bet.id,
      users: this.state.usersBasket.users
    };
    var i = 0
    var losers = 0
    var winners = 0
    this.state.usersBasket.users.forEach(function(user) {
      if (user.winner) {
        winners += 1
      } else {
        losers += 1
      };
    });
    if (losers == this.state.usersBasket.users.length || winners == this.state.usersBasket.users.length) {
      alert('There has to be at least one loser or winner.')
    } else {
      $.ajax({
        url: this.props.origin + '/entries',
        type: 'POST',
        data: data,
        dataType: 'json',
        crossDomain: true,
        headers: {'Authorization': localStorage.getItem('jwt'),
        },
        success: function (data) {
          this.closeTransactionModal();
          this.refs.newTransactionNotification.show();
          this.loadPendingTransaction();
        }.bind(this),
        error: function(error) {
          window.location = "/"
        }.bind(this),
      }); 
    }
  },
  loadPendingTransaction: function () {
    var data = {
      bet_id: this.props.bet.id
    };
    $.ajax({
      url: this.props.origin + '/pending',
      type: 'GET',
      data: data,
      dataType: 'json',
      crossDomain: true,
      headers: {'Authorization': localStorage.getItem('jwt'),
      },
      success: function (data) {
        this.setState({
          pending: data.pending,
          winners: data.winners,
          losers: data.losers,
        })
      }.bind(this),
      error: function(error) {
        window.location = "/"
      }.bind(this),
    }); 
  },
  loadUsers: function () {
    var data = {
      bet_id: this.props.bet.id
    };
    $.ajax({
      url: this.props.origin + '/bet_users',
      type: 'GET',
      data: data,
      dataType: 'json',
      crossDomain: true,
      headers: {'Authorization': localStorage.getItem('jwt'),
      },
      success: function (data) {
        this.setState({
          users: data.data
        });
      }.bind(this),
      error: function(error) {
        window.location = "/"
      }.bind(this),
    }); 
  },
  handleAddUser: function (user_id) {
    var data = {
      bet_id: this.props.bet.id,
      user_id: user_id,
    };
    $.ajax({
      url: this.props.origin + '/add_user',
      type: 'POST',
      data: data,
      dataType: 'json',
      crossDomain: true,
      headers: {'Authorization': localStorage.getItem('jwt'),
      },
      success: function (data) {
        this.closeAddUserModal();
        this.refs.newUserNotification.show();
        this.loadUsers();
      }.bind(this),
      error: function(error) {
        window.location = "/"
      }.bind(this),
    });
  },
  openTransactionModal: function () {
    this.refs.newTransactionDialog.show();
  },
  closeTransactionModal: function () {
    this.refs.newTransactionDialog.dismiss();
    this.state.usersBasket.empty();
  },
  openAddUserModal: function () {
    this.refs.newAddUserDialog.show();
  },
  closeAddUserModal: function () {
    this.refs.newAddUserDialog.dismiss();
  },
  handleDeleteBetConfirmation: function () {
    if (confirm("Are You Sure to Delete Challenge?") == true) {
      this.handleDeleteBet();
    };
  },
  handleDeleteBet: function () {
    var data = {
      bet_id: this.props.bet.id,
    }
    $.ajax({
      url: this.props.origin + '/bets/' + this.props.bet.id,
      type: 'DELETE',
      data: data,
      dataType: 'json',
      crossDomain: true,
      headers: {'Authorization': localStorage.getItem('jwt'),
      },
      success: function (data) {
        this.props.refresh();
      }.bind(this),
      error: function(error) {
        window.location = "/"
      }.bind(this),
    });
  },
  handleApprove: function () {
    var data = {
      bet_id: this.props.bet.id,
    }
    $.ajax({
      url: this.props.origin + '/approve',
      type: 'POST',
      data: data,
      dataType: 'json',
      crossDomain: true,
      headers: {'Authorization': localStorage.getItem('jwt'),
      },
      success: function (data) {
        this.refs.approvedNotification.show();
        this.props.refresh();
        this.loadPendingTransaction();
      }.bind(this),
      error: function(error) {
        window.location = "/"
      }.bind(this),
    });
  },
  render: function () {
    var bet = this.props.bet
    var TransactionDialogAction = [
      <div>
      <FlatButton
        label="Cancel"
        onClick={this.closeTransactionModal}/>
      <FlatButton
        label="Create Entry"
        onClick={this.newTransaction}
        secondary={true}/> 
      </div>
    ];
    var AddUserDialogAction = [
      <div>
      <FlatButton
        label="Cancel"
        onClick={this.closeAddUserModal}/>
      </div>
    ];
    var transactionModal = 
    <Dialog
      ref="newTransactionDialog"
      title="New Entry"
      actions={TransactionDialogAction}
      modal={false}>
      <TransactionModal bet_id={bet.id} origin={this.props.origin} users={this.state.users} usersBasket={this.state.usersBasket}/>
    </Dialog>
    var addUserModal = 
    <Dialog
      ref="newAddUserDialog"
      title={bet.name}
      actions={AddUserDialogAction}
      modal={false}>
      <SearchModal origin={this.props.origin} addUser={this.handleAddUser} users={this.state.users}/>
    </Dialog>
    if (this.state.users === null) {
      var avatars = "Loading users..."
    } else {
      var avatars = this.state.users.map(function (user, index) {
        return (
          <Avatar style={{marginRight: "3px"}}>{user[0].charAt(0) + user[1].charAt(0)}</Avatar>
        )
      }.bind(this)) 
    }
    if (this.state.pending === "true") {
      var showButtons = 
      <div>
        <FlatButton
          label="Approve"
          onClick={this.handleApprove}
          secondary={true}/>
        <FlatButton
          label="Delete Challenge"
          onClick={this.handleDeleteBetConfirmation}
          primary={true}/>
        <PendingTransaction bet={bet} winners={this.state.winners} losers={this.state.losers}/>
      </div>
    } else if (this.state.pending === "approved") {
      var showButtons = 
      <div>
        <FlatButton
          label="Waiting for others to confirm"
          disabled={true}/>
        <FlatButton
          label="Delete Challenge"
          onClick={this.handleDeleteBetConfirmation}
          primary={true}/>
        <PendingTransaction bet={bet} winners={this.state.winners} losers={this.state.losers}/>
      </div>
    } else {
      var showButtons = 
        <div>
        <FlatButton
            label="New Entry"
            onClick={this.openTransactionModal}
            secondary={true}/>
        <FlatButton
          label="Delete Challenge"
          onClick={this.handleDeleteBetConfirmation}
          primary={true}/>
        </div>;
      var addUserButton = 
      <IconButton onClick={this.openAddUserModal}><FontIcon className="material-icons">person_add</FontIcon></IconButton>
    };
    var permanentButtons = 
      <div>
        <FlatButton
          label="Delete Challenge"
          onClick={this.handleDeleteBetConfirmation}/>
      </div>
    var subInfo = moment(bet.created_at).fromNow();
    return (
    	<div>
        {addUserModal}
        {transactionModal}
        <Snackbar
          ref="newUserNotification"
          message='User Added'
          autoHideDuration={2000}/>
        <Snackbar
          ref="newTransactionNotification"
          message='Entry Created'
          autoHideDuration={2000}/>
        <Snackbar
          ref="approvedNotification"
          message='Entry Approved'
          autoHideDuration={2000}/>
        <div className="small-12 medium-12 large-12 columns end betCard">
  	      <Card key={bet.id} initiallyExpanded={false}>
            <CardHeader
            title={bet.name}
            subtitle={subInfo}
            avatar={<Avatar>{bet.name.charAt(0)}</Avatar>}
            showExpandableButton={true} />
            <CardText>
              <div className="betcardtext">
                {avatars}
                {addUserButton}
              </div>
              <div className="betButtons">
                {showButtons}
              </div>
            </CardText>
            <CardText expandable={true}>
            <BetStats bet={bet} origin={this.props.origin}/>
            </CardText>
            <CardActions expandable={true}></CardActions>
          </Card>
        </div>
      </div>
    );
  }
});

module.exports = BetContainer;
