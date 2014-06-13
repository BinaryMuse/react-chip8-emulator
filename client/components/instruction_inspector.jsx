/** @jsx React.DOM */

var _ = require("lodash"),
    React = require("react");

var disassemble = require("../util/disassemble"),
    bits = require("../util/bits"),
    hex = require("../util/hex");

var InstructionInspector = React.createClass({
  createRow: function(instruction, address, disassembly, current) {
    return (
      <tr key={address} className={current ? "current-instruction" : ""}>
        <td>0x{hex(address, 3)}</td>
        <td>{hex(instruction, 4)}</td>
        <td>{disassembly}</td>
      </tr>
    )
  },

  render: function() {
    var instruction, disassembly, zeroInstructions = 0, rows = [];
    for (var i = 0x200; i < this.props.memory.length; i +=2 ) {
      instruction = (this.props.memory[i] << 8) + this.props.memory[i + 1];
      if (instruction === 0) {
        zeroInstructions++;
        if (zeroInstructions >= 10) break;
        disassembly = "";
      } else {
        zeroInstructions = 0;
        disassembly = disassemble(instruction);
        if (disassembly === null) {
          disassembly = bits(instruction);
        }
      }

      rows.push(this.createRow(instruction, i, disassembly, i === this.props.pc));
    }

    return (
      <table className="instruction-inspector mono">
        <thead>
          <tr>
            <th>Address</th>
            <th>Instruction</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

module.exports = InstructionInspector;
