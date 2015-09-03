var React = require('react');
var $ = require('jquery');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Avatar = mui.Avatar;
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;
var Dialog = mui.Dialog;

TransactionModal = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render: function () {
		var avatars = this.props.users.map(function (user, index) {
		  return (
		    <Avatar src={user.pic} key={index} />
		  )
		}.bind(this))
    return (
      <div>
      	{avatars}
      </div>
    )
  },
});

module.exports = TransactionModal;
