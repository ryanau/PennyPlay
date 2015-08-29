var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function() {
    return (
      <div id="menu">
        <span id="menu-link"></span>
        <div id="menu-list">
          <div className="pure-menu pure-menu-open">
            <span className="pure-menu-heading">PennyBet</span>
            <ul>
              <li><Link to="bets">Bets</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});