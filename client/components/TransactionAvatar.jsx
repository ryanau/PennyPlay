var React = require('react');
var $ = require('jquery');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Avatar = mui.Avatar;
var Toggle = mui.Toggle;

TransactionAvatar = React.createClass({
  getInitialState: function () {
    return {
      display: "LOSER",
    }
  },
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
    if (this.state.display === "WINNER") {
      this.setState({
        display: "LOSER"
      });
    } else {
      this.setState({
        display: "WINNER"
      })
    };
  },
  render: function () {
    return (
      <div>
        <Avatar src={this.props.user.pic} />
        <Toggle
          ref="toggle"
          onToggle={this.handleToggle}
          label={this.state.display}/>
      </div>
    )
  },
});

module.exports = TransactionAvatar;
