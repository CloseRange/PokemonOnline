
class animator {
  constructor(parent, pos, img, w, h, ispd) {
    this.parent = parent;
    this.position = pos;
    this.img = new splitImage(parent, pos, img, w, h);
    this.width = w;
    this.height = h;
    this.cellX = 0;
    this.cellY = 0;
    this.realX = 0;
    this.realY = 0;
    this.image_speed = ispd || 1;
  }
  draw() {
    this.img.draw();
  }
  shiftX(n) {
    n = n || 1;
    this.realX += 1*n;
    this.round();
  }
  shiftY(n) {
    n = n || 1;
    this.realY += 1*n;
    this.round();
  }
  animateX(n) {
    n = n || 1;
    this.realX += this.image_speed*n;
    this.round();
  }
  animateY(n) {
    n = n || 1;
    this.realY += this.image_speed*n;
    this.round();
  }
  round() {
    if(this.realX >= this.width) this.realX -= this.width;
    if(this.realY >= this.height) this.realY -= this.height;
    if(this.realX < 0) this.realX += this.width;
    if(this.realY < 0) this.realY += this.height;

    this.cellX = Math.floor(this.realX);
    this.cellY = Math.floor(this.realY);

    this.img.cellX = this.cellX;
    this.img.cellY = this.cellY;



  }
  set(x, y) {
    this.realX = x;
    this.realY = y;
    this.round();
  }
  setX(x) {
    this.set(x, this.realY);
  }
  setY(y) {
    this.set(this.realX, y);
  }
  animateLockX(n) {
    n = n || 1;
    this.realX += this.image_speed*n;
    if(this.realX >= this.width) this.realX = this.width-1
    if(this.realX < 0) this.realX = 0;
    this.round();
  }
  animateLockY(n) {
    n = n || 1;
    this.realY += this.image_speed*n;
    if(this.realY >= this.height) this.realY = this.height-1
    if(this.realY < 0) this.realY = 0;
    this.round();
  }

}
