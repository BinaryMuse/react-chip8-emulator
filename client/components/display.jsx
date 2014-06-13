/** @jsx React.DOM */

var React = require("react");

var Display = React.createClass({
  render: function() {
    var style = {
      width: this.props.ppp * (this.props.width + 1),
      height: this.props.ppp * (this.props.height + 1)
    };

    return (
      <canvas ref="canvas" style={style} />
    );
  },

  componentDidMount: function() {
    this.props.display.setCanvas(this.refs.canvas.getDOMNode());
  }
});

module.exports = Display;
