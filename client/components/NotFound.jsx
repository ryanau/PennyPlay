var React = require('react');

var NavBar = require('./NavBar.jsx');

NotFound = React.createClass({
  render: function () {
    return (
      <div>
      	<h4>Awwwwww... The page you're looking for doesn't exist...</h4>
      </div>
    );
  }
});

module.exports = NotFound;