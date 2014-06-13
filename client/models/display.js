var Display = function(width, height, ppp) {
  this.width = width;
  this.height = height;
  this.ppp = ppp;
};

Display.prototype.setCanvas = function(canvas) {
  this.canvas = canvas;
  this.xScale = this.canvas.width / this.width;
  this.yScale = this.canvas.height / this.height;
  this.context = canvas.getContext("2d");

  if(window.devicePixelRatio == 2) {
    this.canvas.setAttribute('width', this.canvas.width * 2);
    this.canvas.setAttribute('height', this.canvas.height * 2);
    this.context.scale(2, 2);
  }

  this.clear();
};

Display.prototype.clear = function() {
  this.pixels = _.times(this.width, function() {
    return _.times(this.height, _.constant(0));
  });

  this.context.fillStyle = '#000'
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
};

Display.prototype.xorPixel = function(x, y) {
  if (x > this.width) {
    x -= this.width;
  } else if (x < 0) {
    x += this.width;
  }

  if (y > this.height) {
    y -= this.height;
  } else if (y < 0) {
    y += this.height;
  }

  var active = this.pixels[x][y] ^= 1;

  if (active) {
    this.context.fillStyle = "#fff";
  } else {
    this.context.fillStyle = "#000";
  }

  this.context.fillRect(x * this.xScale, y * this.yScale, this.xScale, this.yScale);

  return active;
};

module.exports = Display;
