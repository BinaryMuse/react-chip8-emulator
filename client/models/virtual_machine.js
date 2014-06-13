var EventEmitter = require("events").EventEmitter,
    util = require("util");

var _ = require("lodash");

var VirtualMachine = function() {
  EventEmitter.call(this);

  this.clockSpeed = 100; // Hz
  this.memory = new Uint8Array(new ArrayBuffer(4096)); // 4k memory
  this.I = 0;
  this.V = new Uint8Array(new ArrayBuffer(16));
  this.display = _.times(64, function() {
    return _.times(32, _.constant(0));
  });
};

util.inherits(VirtualMachine, EventEmitter);

VirtualMachine.prototype.loadProgram = function(program) {
  _.each(program, function(byte, i) {
    this.memory[0x200 + i] = byte;
  }, this);
  this.pc = 0x200;
};

VirtualMachine.prototype.step = function() {
  var instruction = (this.memory[this.pc] << 8) + this.memory[this.pc + 1];
  this.execute(instruction);
};

VirtualMachine.prototype.run = function() {
  if (!this.interval) {
    this.interval = setInterval(this.step.bind(this), 1000 / this.clockSpeed);
  }
};

VirtualMachine.prototype.stop = function() {
  if (this.interval) {
    clearInterval(this.interval);
    delete this.interval;
  }
};

VirtualMachine.prototype.execute = function(instruction) {
  this.pc += 2;

  var leftNib = instruction & 0xF000;

  switch (leftNib) {
  case 0x1000:
    this.pc = instruction & 0x0FFF;
    break;
  case 0x3000:
    var reg = (instruction & 0x0F00) >> 8,
        value = instruction & 0x00FF;
    if (this.V[reg] === value) this.pc += 2;
    break;
  case 0x6000:
    var reg = (instruction & 0x0F00) >> 8,
        value = instruction & 0x00FF;
    this.V[reg] = value;
    break;
  case 0x7000:
    var reg = (instruction & 0x0F00) >> 8,
        value = instruction & 0x00FF;
    this.V[reg] = this.V[reg] + value;
    break;
  case 0xA000:
    this.I = instruction & 0x0FFF;
    break;
  case 0xC000:
    this.V[(instruction & 0x0F00) >> 8] = (Math.random() * (0x00FF + 1)) & (instruction & 0x00FF);
    break;
  case 0xD000:
    var x = (instruction & 0x0F00) >> 8,
        y = (instruction & 0x00F0) >> 4,
        n = instruction & 0x000F;
    var collision = this.drawSprite(this.V[x], this.V[y], this.I, n);
    this.V[0xF] = collision ? 1 : 0;
    break;
  }

  this.emit("step");
};

VirtualMachine.prototype.drawSprite = function(x, y, start, bytes) {
  var i, bit, collision = false;

  if (x > 64) {
    x -= 64;
  } else if (x < 0) {
    x += 64;
  }

  if (y > 32) {
    y -= 32;
  } else if (y < 0) {
    y += 32;
  }

  for (i = 0; i < bytes; i++) {
    var bits = this.memory[i + start];
    for (bit = 7; bit >= 0; bit--) {
      if (bits & 1) {
        if (this.display[x + bit][y + i]) collision = true;
        this.display[x + bit][y + i] ^= 1;
      }

      bits >>= 1;
    }
  }

  return collision;
};

module.exports = VirtualMachine;
