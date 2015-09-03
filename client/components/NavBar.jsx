var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

var Toolbar = mui.Toolbar;
var ToolbarTitle = mui.ToolbarTitle;
var ToolbarSeparator = mui.ToolbarSeparator;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;

module.exports = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render: function() {
    return (
      <div id="menu">
        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <Link to="dashboard">Dashboard</Link>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
});