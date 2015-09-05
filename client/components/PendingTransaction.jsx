var React = require('react');
var $ = require('jquery');
var moment = require('moment');


var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

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
    return (
      <div>

      </div>
    )
  }
});

module.exports = PendingTransaction;
