var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = mui.FlatButton;

Landing = React.createClass({
	childContextTypes: {
	  muiTheme: React.PropTypes.object
	},

	getChildContext: function () {
	  return {
	    muiTheme: ThemeManager.getCurrentTheme()
	  };
	},
  render: function () {
  	if (this.props.signedIn) {
		 	var button = 
		 	<FlatButton
		 		containerElement={<Link to="/dashboard" />}
		 		linkButton={true}
		 		label={('no', 'Start the Challenge')}/>
		} else {
			var button = <FlatButton
			  linkButton={true}
			  label="Log In with Venmo"
			  // href={'https://pennyplay.herokuapp.com/auth/venmo'}/>
			  href={'http://localhost:3000/auth/venmo'}/>
		}
    return (
    	<div>
    		<div id="landing">
				</div>
				<div id="venmo">
			    <h4>It is time to challenge your friends.</h4>
		      {button}
	      </div>
      </div>
    );
  }
});

module.exports = Landing;