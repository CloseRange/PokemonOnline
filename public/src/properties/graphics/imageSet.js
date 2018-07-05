
var imageSets = {};

class imageSet {
  constructor(file, name, w, h) {
    this.image = new rawImage(file, name);
    this.split = new splitImage(this, null, name, w, h);
    this.w = w;
    this.h = h;
    imageSets[name] = this;
  }
  draw(x, y, pos) {

    this.split.draw(pos, x, y);
  }
  static draw(name, pos, cx, cy) {
    if(imageSets[name]) {
    imageSets[name].draw(cx, cy, pos);
    }
  }
}
