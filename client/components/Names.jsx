var React = require('react');

Names = React.createClass({
  render: function () {
    var name = this.props.name
    return (
      <p>{name}</p>
    )
  }
});

module.exports = Names;
