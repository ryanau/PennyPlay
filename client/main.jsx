require('./assets/foundation.min.css');
require('./assets/foundation.min.js');
require('./assets/normalize.css');
require('./assets/app.css');

var React = require('react');
var App = require('./components/App.jsx');
var Router = require('react-router');
var routes = require('./config/routes.jsx');
var $ = require('jquery');



Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
