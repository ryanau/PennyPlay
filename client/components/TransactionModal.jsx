var React = require('react');
var $ = require('jquery');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var TransactionAvatar = require('./TransactionAvatar.jsx')

TransactionModal = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  handleToggle: function (e) {
    this.setState({
      winner: this.refs.toggle.isToggled()
    });
  },
  render: function () {
		var avatars = this.props.users.map(function (user, index) {
		  return (
        <TransactionAvatar key={index} users={this.props.users} user={user} usersBasket={this.props.usersBasket}/>
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
