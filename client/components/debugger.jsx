/** @jsx React.DOM */

var React = require("react");

var InstructionInspector = require("./instruction_inspector.jsx"),
    RegisterInspector = require("./register_inspector.jsx");

var Debugger = React.createClass({
  render: function() {
    return (
      <div>
        <InstructionInspector memory={this.props.vm.memory} pc={this.props.vm.pc} />
        <RegisterInspector V={this.props.vm.V} I={this.props.vm.I} />
      </div>
    );
  }
});

module.exports = Debugger;
