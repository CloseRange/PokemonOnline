
class splitImage {
  constructor(parent, pos, img, w, h) {
    this.parent = parent;
    this.position = pos;
    this.img = rawImages[img];
    this.width = w;
    this.height = h;
    this.cellX = 0;
    this.cellY = 0;
  }
  draw(pos, cx, cy) {
    pos = pos || this.position;
    cx = cx || this.cellX;
    cy = cy || this.cellY;
    if(!this.img.loaded) return;
    var sw = this.img.width / this.width;
    var sh = this.img.height / this.height;

    var dx = pos.x;
    var dy = pos.y;

    image(this.img.raw, dx, dy, sw, sh, cx*sw, cy*sh, sw, sh);
  }
}
