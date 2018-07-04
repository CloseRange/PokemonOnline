var rawImages = {};

class rawImage {
  constructor(file, name) {
    if(!name) {
      name = file;
      file = "";
    } else file += "/";
    this.file = file;
    this.name = name;
    this.raw = loadImage("res/" + file + name + ".png", () => {
      this.loaded = true;
      this.width = this.raw.width;
      this.height = this.raw.height;
    });
    this.loaded = false;
    rawImages[name] = this;
  }

}
