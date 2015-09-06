var React = require('react');
var $ = require('jquery');
var moment = require('moment');


var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var List = mui.List;
var ListItem = mui.ListItem;
var ListDivider = mui.ListDivider;
var Avatar = mui.Avatar;

PendingTransaction = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render: function () {
    console.log(this.props.winners[0].first_name)
    var winners = this.props.winners.map(function (winner, index){
      return (
        <ListItem key={index} primaryText={winner.first_name} />
      )
    });
    var losers = this.props.losers.map(function (loser, index){
      return (
        <ListItem key={index} primaryText={loser.first_name} />
      )
    })
    return (
      <div>
        <h4>Pending</h4>
        <List>
          <p>Winners</p>
          {winners}
        </List>
        <ListDivider />
        <List>
          <p>Losers</p>
          {losers}
        </List>
      </div>
    )
  }
});

module.exports = PendingTransaction;
