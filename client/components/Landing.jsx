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
		 		hoverColor={'#BDBDBD'}
		 		style={{backgroundColor: '#FFCC80'
		 		        }}
		 		label={('no', 'Start the Challenge')}/>
		} else {
			var button = <FlatButton
			  linkButton={true}
			  label="Log In with Venmo"
			  hoverColor={'#BDBDBD'}
			  style={{backgroundColor: '#FFCC80'
			          }}
			  // comment the following line in development
			  href={'https://pennyplay.herokuapp.com/auth/venmo'}/>

			  // comment the following line when deploying to heroku
			  // href={'http://localhost:3000/auth/venmo'}/>
		}
    return (
    	<div>
    		<div id="landing">
    			<img src="./jump.jpg" />
				</div>
				<div id="venmo">
			    <h4 style={{color: "#B0BEC5"}}>It is time to challenge your friends.</h4>
		      {button}
	      </div>
      </div>
    );
  }
});

module.exports = Landing;