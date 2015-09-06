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
    this.props.usersBasket.addToUsers({user_id: this.props.user.id, winner: false})
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
    if (this.props.user.pic == "https://s3.amazonaws.com/venmo/no-image.gif" || this.props.user.pic.substring(0,27) == "https://graph.facebook.com/") {
      var avatar = <Avatar>{this.props.user.first_name.charAt(0) + this.props.user.last_name.charAt(0)}</Avatar>
    } else {
      var avatar = <Avatar src={this.props.user.pic} />
    };
    return (
      <div>
        <div>
          <div className="Fl-l">
            {avatar} 
          </div>
          <div className="Fl-l Mx-10">
            {this.props.user.first_name}
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

