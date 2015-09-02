var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var Link = Router.Link;
var TransactionsContainer = require('./TransactionsContainer.jsx')

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = mui.FlatButton;
var Card = mui.Card;
var CardHeader = mui.CardHeader;
var CardText = mui.CardText;
var CardActions = mui.CardActions;
var CardTitle = mui.CardTitle;

BetContainer = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  newTransaction: function () {
    var data = {
      id: this.props.bet.id
    };
    $.ajax({
      url: this.props.origin + '/transactions',
      type: 'POST',
      data: data,
      dataType: 'json',
      crossDomain: true,
      headers: {'Authorization': sessionStorage.getItem('jwt'),
      },
      success: function (data) {
        console.log('transaction created')
      }.bind(this),
    });
  },
  render: function () {
    var bet = this.props.bet
    var transactions = bet.transactions.map(function (transaction, index) {
      return (
        <TransactionsContainer origin={this.props.origin} key={transaction.id} transaction={transaction} />
      );
    }.bind(this));
    var subInfo = "Created at: " + bet.created_at
    return (
    	<div>
	      <Card initiallyExpanded={false}>
          <CardHeader
          key={bet.id}
          title={bet.name}
          subtitle={subInfo}
          showExpandableButton={true} />
          <CardText>
            <FlatButton
              label="New Transaction"
              onClick={this.newTransaction}/>
          </CardText>
          <CardText expandable={true}> {transactions} </CardText>
          <CardActions expandable={true}></CardActions>
        </Card>
      </div>
    );
  }
});

module.exports = BetContainer;
