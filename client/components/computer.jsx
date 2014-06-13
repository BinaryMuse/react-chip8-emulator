/** @jsx React.DOM */

var React = require("react");

var Display = require("./display.jsx"),
    Debugger = require("./debugger.jsx");

var Computer = React.createClass({
  render: function() {
    return (
      <div>
        <Display display={this.props.vm.display}
                 ppp={10} />
        <div>
          <button onClick={this.handleRun}>Run</button>
          <button onClick={this.handleStop}>Stop</button>
          <button onClick={this.handleStep}>Step</button>
        </div>
        <Debugger vm={this.props.vm} />
      </div>
    );
  },

  handleRun: function() {
    this.props.vm.run();
  },

  handleStop: function() {
    this.props.vm.stop();
  },

  handleStep: function() {
    this.props.vm.step();
  }
});

module.exports = Computer;
