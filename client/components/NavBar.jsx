var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var $ = require('jquery');


module.exports = React.createClass({
  handleSignOutLink: function() {
    sessionStorage.setItem('jwt','');
    location = '/';
  },
  render: function() {
    if (this.props.signedIn) {
      var homeLink = <Link to="dashboard">PennyPlay</Link>
      var signingLink = <li onClick={this.handleSignOutLink}><a href="/">Sign Out</a></li>
    } else {
      var homeLink = <Link to="/">PennyPlay</Link>
    }
    return (
      <div className="fixed">
        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1><a href="#">{homeLink}</a></h1>
            </li>
            <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
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
