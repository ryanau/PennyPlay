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
    return (
    	<div>
    		<div id="landing">
					<img src="DSC_2115.jpg" alt="" />
				</div>
				<div id="venmo">
			    <h4>It is time to challenge your friends.</h4>
		      <FlatButton
		        linkButton={true}
		        label="Log In with Venmo"
		        href={'http://localhost:3000/auth/venmo'}/> 
	      </div>
      </div>
    );
  }
});

module.exports = Landing;