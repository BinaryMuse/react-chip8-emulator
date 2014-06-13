// 1nnn - Jump to location nnn.
// 3xkk - Skip next instruction if Vx = kk.
// 6xkk - Set Vx = kk.
// 7xkk - Set Vx = Vx + kk.
// Annn - Set I = nnn.
// Cxkk - Set Vx = random byte AND kk.
// Dxyn - Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.

var hex = require("./hex");

function disassemble(instruction) {
  var leftNib = instruction & 0xF000;

  switch (leftNib) {
  case 0x1000:
    return "Jump to location 0x" + hex(instruction & 0x0FFF);
  case 0x3000:
    return "Skip next instruction if V" + hex((instruction & 0x0F00) >> 8) + " = 0x" + hex(instruction & 0x00FF, 2);
  case 0x6000:
    return "Set V" + hex((instruction & 0x0F00) >> 8) + " = " + hex(instruction & 0x00FF, 2);
  case 0x7000:
    var reg = hex((instruction & 0x0F00) >> 8);
    return "Set V" + reg + " = V" + reg + " + " + hex(instruction & 0x00FF, 2);
  case 0xA000:
    return "Set I = " + hex(instruction & 0x0FFF, 3);
  case 0xC000:
    return "Set V" + hex((instruction & 0x0F00) >> 8) + " = random byte AND " + hex(instruction & 0x00FF, 2);
  case 0xD000:
    var x = hex((instruction & 0x0F00) >> 8),
        y = hex((instruction & 0x00F0) >> 4),
        n = hex(instruction & 0x000F);
    return "Display " + n + " sprites starting at location I at (V" + x + ", V" + y + "); set VF = collision";
  }

  return null;
}

module.exports = disassemble;
