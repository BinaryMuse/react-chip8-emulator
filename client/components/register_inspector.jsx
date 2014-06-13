/** @jsx React.DOM */

var _ = require("lodash"),
    React = require("react");

var hex = require("../util/hex");

var RegisterInspector = React.createClass({
  render: function() {
    return (
      <div className="register-inspector mono">
        {_.range(16).map(function(i) {
          return <div key={i}>V{hex(i)}: {hex(this.props.V[i], 2)}</div>;
        }, this)}
        <div key="i">&nbsp;I: {hex(this.props.I, 4)}</div>
      </div>
    );
  }
});

module.exports = RegisterInspector;
