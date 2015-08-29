var React = require('react');
var Reqwest = require('reqwest');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var NavBar = require('./NavBar.jsx');

App = React.createClass({
	getDefaultProps: function() {
    // return {origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''};
    return {origin: 'http://localhost:3000'}
  },
  readFromAPI: function(url, successFunction) {
    console.log('1')
    Reqwest({
      url: url,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      headers: {'Authorization': sessionStorage.getItem('jwt')},
      // headers: {'hola': 'hey'},
      success: successFunction,
      error: function(error) {
        console.error(url, error['response']);
        location = '/';
      }
    });
  },
  writeToAPI: function(url, method, data, successFunction) {
    Reqwest({
      url: url,
      type: 'json',
      method: method,
      data: JSON.stringify(data),
      contentType: 'application/json',
      headers: {'Authorization': sessionStorage.getItem('jwt')},
      success: successFunction,
      error: function(error) {
        console.error(url, error['response']);
        location = '/';
      }
    });
  },
  render: function () {
    return (
      <div id="app">
        <NavBar />
        <div id="content">
          <RouteHandler origin={this.props.origin} readFromAPI={this.readFromAPI} writeToAPI={this.writeToAPI}/>
        </div>
      </div>
    );
  }
});

module.exports = App;