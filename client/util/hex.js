function hex(num, pad) {
  num = num.toString(16).toUpperCase();
  if (pad) {
    var s = num + "";
    while (s.length < pad) s = "0" + s;
    return s;
  }
  return num;
}

module.exports = hex;
