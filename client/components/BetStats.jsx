var React = require('react');
var $ = require('jquery');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

BetStats = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function () {
    return {
      stats: null,
    }
  },
  componentDidMount: function () {
    this.loadStats();
  },
  loadStats: function () {
    var data = {
      bet_id: this.props.bet.id
    };
    $.ajax({
      url: this.props.origin + '/bet_stats',
      type: 'GET',
      data: data,
      dataType: 'json',
      crossDomain: true,
      headers: {'Authorization': localStorage.getItem('jwt'),
      },
      success: function (data) {
        this.setState({
          stats: data.stats,
        })
      }.bind(this),
      error: function(error) {
        window.location = "/"
      }.bind(this),
    }); 
  },
  render: function () {
    if (this.state.stats === null) {
      var stats = "Loading stats"
    } else {
      var stats = this.state.stats
    }
    return (
      <div>
      	<h6>PAST WINS</h6>
        {stats}
      </div>
    )
  },
});

module.exports = BetStats;
