
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var AppBar = mui.AppBar;
var FlatButton = mui.FlatButton;
var FontIcon = mui.FontIcon;

module.exports = React.createClass({
  handleSignOutLink: function() {
    localStorage.setItem('jwt','');
    location = '/';
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {
    if (this.props.signedIn) {
      var homeLink = <Link to="dashboard">PennyPlay</Link>
      var signingLink = <FlatButton
                            onClick={this.handleSignOutLink}
                            hoverColor={'#FF9800'}
                            rippleColor={'#FF9800'}
                            style={{backgroundColor: '#FF9800',
                                    color: '#002e32',
                                    lineHeight: '18px'}}
                            label={('no', 'SignOut')}/>
    } else {
      var homeLink = <Link to="/">PennyPlay</Link>
    }
    return (
      <div className="fixed">
        <AppBar 
          iconElementLeft={<FlatButton
                            containerElement={<Link to="/dashboard" />}
                            linkButton={true}
                            hoverColor={'#FF9800'}
                            rippleColor={'#FF9800'}
                            style={{backgroundColor: '#FF9800',
                                    color: '#002e32',
                                    fontSize:'18px',
                                    fontFamily: 'Lato', 
                                    fontWeight: "700"}}
                            label={('no', 'PennyPlay')}/>}
          style={{marginBottom: '0px',
                  backgroundColor: '#FF9800',
                  minHeight: '0px'}}
          iconElementRight={signingLink}/>
      </div>
    );
  }
});
