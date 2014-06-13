function toBits(instruction) {
  var byte1 = (instruction & 0xFF00) >> 8,
      byte2 = instruction & 0x00FF;
  var bits1 = byte1.toString(2),
      bits2 = byte2.toString(2);
  while (bits1.length < 8) bits1 = "0" + bits1;
  while (bits2.length < 8) bits2 = "0" + bits2;
  return bits1 + bits2;
}

module.exports = toBits;
