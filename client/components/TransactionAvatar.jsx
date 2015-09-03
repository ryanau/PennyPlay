var React = require('react');
var $ = require('jquery');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Avatar = mui.Avatar;
var Toggle = mui.Toggle;

TransactionAvatar = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  handleToggle: function (e) {
    this.props.usersBasket.addToUsers({user_id: this.props.user.id, winner: this.refs.toggle.isToggled()})
  },
  render: function () {
    return (
      <div>
        <Avatar src={this.props.user.pic} />
        <Toggle
          ref="toggle"
          onToggle={this.handleToggle}
          label="WINNER"/>
      </div>
    )
  },
});

module.exports = TransactionAvatar;
