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
