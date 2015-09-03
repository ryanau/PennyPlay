var React = require('react');

var NavBar = require('./NavBar.jsx');

NotFound = React.createClass({
  render: function () {
    return (
      <div>
      Route Not Found
      </div>
    );
  }
});

module.exports = NotFound;