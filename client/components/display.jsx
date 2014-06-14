/** @jsx React.DOM */

var React = require("react");

var Display = React.createClass({
  render: function() {
    var style = {
      width: this.props.ppp * (this.props.display.length + 1),
      height: this.props.ppp * (this.props.display[0].length + 1)
    };

    return <canvas ref="canvas" style={style} />;
  },

  componentDidMount: function() {
    var width = this.props.display.length,
        height = this.props.display[0].length,
        canvas = this.refs.canvas.getDOMNode(),
        context = canvas.getContext("2d");

    this.xScale = canvas.width / width;
    this.yScale = canvas.height / height;

    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
      canvas.setAttribute('width', canvas.width * window.devicePixelRatio);
      canvas.setAttribute('height', canvas.height * window.devicePixelRatio);
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    this.draw();
  },

  componentDidUpdate: function() {
    this.draw();
  },

  draw: function() {
    var canvas = this.refs.canvas.getDOMNode(),
        context = canvas.getContext("2d");

    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fff';

    for (var i = 0; i < this.props.display.length; i++) {
      for (var j = 0; j < this.props.display[i].length; j++) {
        if (this.props.display[i][j]) {
          context.fillRect(i * this.xScale, j * this.yScale, this.xScale, this.yScale);
        }
      }
    }
  }
});

module.exports = Display;
