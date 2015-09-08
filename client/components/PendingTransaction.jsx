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
    var winners = this.props.winners.map(function (winner_name, index){
      return (
        {winner_name}
      )
    });
    var losers = this.props.losers.map(function (loser_name, index){
      return (
        {loser_name}
      )
    });
    var info = moment(this.props.bet.entries[this.props.bet.entries.length -1].created_at).fromNow()
    return (
      <div>
        <p>Pending Entry from {info}</p>
          <p>Winners: {winners}</p>
          <p>Losers: {losers}</p>
          
      </div>
    )
  }
});

module.exports = PendingTransaction;
