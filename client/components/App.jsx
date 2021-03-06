var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Uri = require('jsuri');
var $ = require('jquery');

var NavBar = require('./NavBar.jsx');

App = React.createClass({
	getDefaultProps: function() {
    return {

      // comment the following line when in development
      origin: '/api',

      // comment the following line when deploying to heroku
      // origin: 'http://localhost:3000/api'
    }
  },
  getInitialState: function () {
    return {
      signedIn: false,
      currentUser: {uid: null, first_name: null, last_name: null, pic: null}
    }
  },
  componentWillMount: function() {
    var jwt = new Uri(location.search).getQueryParamValue('jwt');
    console.log(jwt)
    if (!!jwt) {localStorage.setItem('jwt', jwt);}
    console.log(localStorage.jwt)
  },
  componentDidMount: function() {
    if (!!localStorage.getItem('jwt')) {this.currentUserFromAPI();}
  },
  currentUserFromAPI: function() {
    $.ajax({
      url: this.props.origin + '/current_user',
      type: 'GET',
      dataType: 'json',
      crossDomain: true,
      headers: {'Authorization': localStorage.getItem('jwt'),
      },
      success: function (data) {
        this.setState({signedIn: true, currentUser: {uid: data.uid, first_name: data.first_name, last_name: data.last_name, pic: data.pic}});
      }.bind(this),
      error: function(error) {
        window.location = "/"
      }.bind(this),
    });
  },
  render: function () {
    return (
      <div id="app">
        <NavBar signedIn={this.state.signedIn}/>
        <div className="container">
          <RouteHandler origin={this.props.origin} currentUser={this.state.currentUser} signedIn={this.state.signedIn}/>
        </div>
      </div>
    );
  }
});

module.exports = App;