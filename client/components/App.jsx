var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Uri = require('jsuri');
var $ = require('jquery');

var NavBar = require('./NavBar.jsx');

App = React.createClass({
	getDefaultProps: function() {
    // return {origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''};
    return {
      origin: 'http://localhost:3000',
    }
  },
  getInitialState: function () {
    return {
      signedIn: false,
      currentUser: {uid: null, first_name: null, last_name: null}
    }
  },
  componentWillMount: function() {
    var jwt = new Uri(location.search).getQueryParamValue('jwt');
    if (!!jwt) {sessionStorage.setItem('jwt', jwt);}
  },
  componentDidMount: function() {
    if (!!sessionStorage.getItem('jwt')) {this.currentUserFromAPI();}
  },
  currentUserFromAPI: function() {
    $.ajax({
      url: this.props.origin + '/current_user',
      type: 'GET',
      dataType: 'json',
      crossDomain: true,
      headers: {'Authorization': sessionStorage.getItem('jwt'),
      },
      success: function (data) {
        this.setState({signedIn: true, currentUser: {uid: data.uid, first_name: data.first_name, last_name: data.last_name}});
        console.log(this.state.currentUser)
      }.bind(this),
    });


  },
  
  render: function () {
    return (
      <div id="app">
        <NavBar />
        <div id="content">
          <RouteHandler origin={this.props.origin}/>
        </div>
      </div>
    );
  }
});

module.exports = App;