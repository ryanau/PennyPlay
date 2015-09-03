var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  handleSignOutLink: function() {
    sessionStorage.setItem('jwt','');
    location = '/';
  },
  render: function() {
    if (this.props.signedIn) {
      var homeLink = <Link to="dashboard">PennyBet</Link>
      var signingLink = <li onClick={this.handleSignOutLink}><a href="/">Sign Out</a></li>
    } else {
      var homeLink = <Link to="/">PennyBet</Link>
    }
    return (
      <div className="fixed">
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1><a href="#">{homeLink}</a></h1>
            </li>
          </ul>

          <section className="top-bar-section">
            <ul className="right">
              {signingLink}
            </ul>
          </section>
        </nav>
      </div>
    );
  }
});
