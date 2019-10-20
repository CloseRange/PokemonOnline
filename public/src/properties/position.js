
class position {
  constructor(parent, x, y, xoff, yoff) {
    this.parent = parent;
    this.x = x + (xoff==undefined ? 0 : xoff);
    this.y = y + (yoff==undefined ? 0 : yoff);
  }
}
