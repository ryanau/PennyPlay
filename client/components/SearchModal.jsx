var React = require('react');
var $ = require('jquery');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Avatar = mui.Avatar;
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;
var Styles = mui.Styles;

SearchModal = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function () {
    return {
      result: null,
    }
  },
  fetchUser: function () {
    var data = {
      phone: this.refs.search.getValue()
    };
    var signal = true
    var existingUsers = this.props.users.forEach(function(user) {
      if (data.phone === user[3]) {
        signal = false;
      };
    });
    if (data.phone.length == 10 && signal) {
      $.ajax({
        url: this.props.origin + '/users',
        type: 'GET',
        data: data,
        dataType: 'json',
        crossDomain: true,
        headers: {'Authorization': sessionStorage.getItem('jwt'),
        },
        success: function (data) {
          this.setState({
            result: data.data
          })
        }.bind(this),
        error: function(error) {
          window.location = "/"
        }.bind(this),
      });
    };
  },
  handleAvatarClicked: function () {
    this.props.addUser(this.state.result.id)
  },
  render: function () {
    if (this.state.result === null) {
      var result = "Loading users..."
    } else if (this.state.result.pic == "https://s3.amazonaws.com/venmo/no-image.gif" || this.state.result.pic.substring(0,27) == "https://graph.facebook.com/") {
      var result = <Avatar onClick={this.handleAvatarClicked}>{this.state.result.first_name.charAt(0) + this.state.result.last_name.charAt(0)}</Avatar>
    } else {
      var result = <Avatar src={this.state.result.pic} onClick={this.handleAvatarClicked}/>
    };
    return (
      <div>
      <TextField
        ref="search"
        onChange={this.fetchUser}
        hintText="Search by Phone"
        underlineFocusStyle={{borderColor: Styles.amber900}}/>
      <p>Add User by Clicking the Icon</p>
      {result}
      </div>
    )
  },
});

module.exports = SearchModal;
