var React = require('react');
var Router = require('react-router');
var App = require('../components/App.jsx');
var BetsContainer = require('../components/BetsContainer.jsx');
var Landing = require('../components/Landing.jsx');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="landing" handler={Landing} />
    <Route name="dashboard" handler={BetsContainer} />
  </Route>
);