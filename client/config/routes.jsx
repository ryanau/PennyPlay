var React = require('react');
var Router = require('react-router');
var App = require('../components/App.jsx');
var Dashboard = require('../components/Dashboard.jsx');
var NotFound = require('../components/NotFound.jsx');
var Landing = require('../components/Landing.jsx');


var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;


module.exports = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="landing" handler={Landing} />
    <Route name="dashboard" handler={Dashboard} />

    <NotFoundRoute handler={NotFound} />
  </Route>
);