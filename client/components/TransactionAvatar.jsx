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
  componentDidMount: function () {
    this.preLoad();
  },
  preLoad: function () {
    this.props.usersBasket.addToUsers({user_id: this.props.user[4], winner: false})
  },
  handleToggle: function (e) {
    this.props.usersBasket.addToUsers({user_id: this.props.user[4], winner: this.refs.toggle.isToggled()})
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
    if (this.props.user[2] == "https://s3.amazonaws.com/venmo/no-image.gif" || this.props.user[2].substring(0,27) == "https://graph.facebook.com/") {
      var avatar = <Avatar tooltip={this.props.user[0]}>{this.props.user[0].charAt(0) + this.props.user[1].charAt(0)}</Avatar>
    } else {
      var avatar = <Avatar tooltip={this.props.user[0]} src={this.props.user[2]} />
    };
    return (
      <div>
        <div>
          <div className="Fl-l">
            {avatar} 
          </div>
          <div className="Fl-l Mx-10">
            {this.props.user[0]}
          </div>
        </div>
        <Toggle
          ref="toggle"
          onToggle={this.handleToggle}
          label={this.state.display}/>
      </div>
    )
  },
});

module.exports = TransactionAvatar;

