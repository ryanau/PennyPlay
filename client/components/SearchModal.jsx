var React = require('react');
var $ = require('jquery');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Avatar = mui.Avatar;
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;

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
    if (data.phone.length == 10) {
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
    } else {
      var result = <Avatar src={this.state.result.pic} onClick={this.handleAvatarClicked}/>
    };
    return (
      <div>
      <TextField
        ref="search"
        onChange={this.fetchUser}
        floatingLabelText="Search by Phone" />
      <p>Add User by Clicking the Icon</p>
      {result}
      </div>
    )
  },
});

module.exports = SearchModal;
