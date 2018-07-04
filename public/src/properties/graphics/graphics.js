
class graphics {
  constructor(parent, pos, img) {
    this.parent = parent;
    this.position = pos;
    this.img = rawImages[img];
  }
  draw() {
    if(!this.img.loaded) return;
    image(this.img.raw, this.position.x, this.position.y);
  }
}
