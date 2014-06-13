require("./client/style.less");

var React = require("react");

var Computer = require("./client/components/computer.jsx"),
    VirtualMachine = require("./client/models/virtual_machine.js"),
    Display = require("./client/models/display");

var loadROM = function(name) {
  return new Promise(function(res, rej) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "roms/" + name, true);
    xhr.responseType = "arraybuffer";

    xhr.onload = function() {
      res(new Uint8Array(xhr.response));
    };

    xhr.send();
  });
};

var vm = new VirtualMachine(new Display(64, 32, 10));
window.vm = vm;

loadROM("MAZE").then(function(bytes) {
  vm.loadProgram(bytes);
  React.renderComponent(Computer({vm: vm}), document.getElementById("app"));
});

vm.on("step", function() {
  React.renderComponent(Computer({vm: vm}), document.getElementById("app"));
});

// var programBytes = [
//   0xa2, 0x1e, 0xc2, 0x01, 0x32, 0x01, 0xa2, 0x1a, 0xd0, 0x14, 0x70, 0x04, 0x30, 0x40, 0x12, 0x00,
//   0x60, 0x00, 0x71, 0x04, 0x31, 0x20, 0x12, 0x00, 0x12, 0x18, 0x80, 0x40, 0x20, 0x10, 0x20, 0x40,
//   0x80, 0x10//, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
// ];
//
// var instructions = [];
//
// for (var i = 0; i < programBytes.length; i += 2) {
//   var byte1 = programBytes[i],
//       byte2 = programBytes[i + 1];
//   instructions.push((byte1 << 8) + byte2);
// }
//
// var vm = new VirtualMachine();
//
// vm.loadROM("MAZE").then(function(bytes) {
//   console.log(bytes);
// });
