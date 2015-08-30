var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var NavBar = require('./NavBar.jsx');

App = React.createClass({
	getDefaultProps: function() {
    // return {origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''};
    return {
      origin: 'http://localhost:3000',
    }
  },
  
  render: function () {
    return (
      <div id="app">
        <NavBar />
        <div id="content">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = App;