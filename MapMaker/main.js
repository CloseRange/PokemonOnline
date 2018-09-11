
var version = "v1.1";

var canvas;
var img;
var wid = 25;
var hei = 20;


function tile(x, y) {
  return {x, y};
}
var layers = {
  tileset: "",
  width: wid,
  height: hei,
  backgroundTile: tile(0, 0),
  layer1: [],
  layer2: [],
  layer3: []
};
var layer = 0;

var mapImage;
var mapImage1;
var mapImage2;
var mapImage3;
var tileset;
var tilesetOffset = 0;

var tileX = 0;
var tileY = 0;

var bt_bgTile;
var buts = [];
var checks = [];
function setup() {
  // canvas = createCanvas(500, 500);
  pixelDensity(1);
  drawMap();
  buts[0] = createButton("Set Background Tile");
  makeBut(1, "none");
  makeBut(2, "layer 1");
  makeBut(3, "layer 2");
  makeBut(4, "layer 3");

  var inp = createInput("untitled");
  var but = createButton("Save");
  but.mouseReleased(function() {
    saveJSON(layers, inp.value())
  });
  // buts[1] = createButton("Set Background Tile");
  // checks[1] = createCheckbox();
  // buts[2] = createButton("Set Background Tile");
  // checks[2] = createCheckbox();

  buts[0].mouseReleased(function() {
    layers.backgroundTile = tile(tileX, tileY);
    drawMap();
  });
  buts[1].mouseReleased(function() {
    layer = 0;
    setCheck(1);
    drawMap();
    drawMap(getLayer());
  });
  buts[2].mouseReleased(function() {
    layer = 1;
    setCheck(2);
    drawMap();
    drawMap(getLayer());
  });
  buts[3].mouseReleased(function() {
    layer = 2;
    setCheck(3);
    drawMap();
    drawMap(getLayer());
  });
  buts[4].mouseReleased(function() {
    layer = 3;
    setCheck(4);
    drawMap();
    drawMap(getLayer());
  });
  layer = 0;
  checks[1].checked(true);

  make(wid, hei);
  pos();
}
var dragging = false;

function makeBut(id, name) {
  buts[id] = createButton(name);
  checks[id] = createCheckbox();
  checks[id].changed(function() {
    checks[id].checked(!checks[id].checked());
  });
}
function setCheck(ind) {
  setChecksFalse();
  checks[ind].checked(true);
}
function setChecksFalse() {
  for(var i=0; i<checks.length; i++) if(checks[i]) checks[i].checked(false);
}
function pos() {
  var p = canvas.position();
  for(var i=0; i<buts.length; i++) {
    buts[i].position(p.x +width + 24, i*24 + 24);
    buts[i].size(150, 20);
    if(checks[i]) {
      checks[i].position(p.x+width +24 + 150, i*24 +24);
    }
  }
}
function setCanvas() {
  canvas.drop(function(file) {
    console.log(file);
    if(file.subtype == "json") {
      var js = loadJSON(file.data)
      layers = js;
      console.log(js);
      drawMap();
    }
    if(file.type == "image") {
      tileset = createImg(file.data).hide();
      layers.tileset = file.name;
      tileX = 0;
      tileY = 0;
      tilesetOffset = 0;
      console.log(tileset.width /32, tileset.height /32);
      drawMap();
    }
  });
  canvas.mouseWheel(function(event) {
    var d = Math.sign(-event.deltaY);
    tilesetOffset += d*64;
    drawMap(getLayer());
  });
  canvas.mousePressed(function() {
    dragging = true;
    if(mouseX < 8*32) {
      var x = mouseX;
      var y = mouseY -tilesetOffset;
      var preX = tileX;
      var preY = tileY;
      tileX = (x - (x % 32)) /32;
      tileY = (y - (y % 32)) /32;
      var pre = false;
      if(tileX < 0) pre = true;;
      if(tileY < 0) pre = true;;
      if(tileset && tileY > (tileset.height /32)-1) pre = true;
      if(pre) {
        tileX = preX;
        tileY = preY;
      }
    } else {
      if(mouseX < width) setTile();
    }
    drawMap(getLayer());
  });
  canvas.mouseReleased(function() {
    dragging = false;
  });
  canvas.mouseOut(function() {
    dragging = false;
  });
  pos();
  drawMap();
}
function getLayer() {
  var l = null;
  if(layer == 1) l = "layer1";
  if(layer == 2) l = "layer2";
  if(layer == 3) l = "layer3";
  return l;
}
function setTile() {
  if(layer == 0) return;
  var cx = (mouseX - (mouseX %32)) /32 -8;
  var cy = (mouseY - (mouseY %32)) /32;
  var l = getLayer();
  var tl = tile(tileX, tileY);
  for(var i=0; i<layers[l].length; i++) {
    if(layers[l][i].x == cx && layers[l][i].y == cy) {
      if(layers[l][i].tile != tl) drawMap(l);
      layers[l][i].tile = tl;
      if(keyIsDown(17)) layers[l].splice(i, 1);
      return;
    }
  }
  if(keyIsDown(17)) return
  drawMap(l);
  layers[l].push({
    x: cx,
    y: cy,
    tile: tile(tileX, tileY)
  });
}
function draw() {
  if(dragging && mouseX >= 8*32 && mouseX < width) setTile();
}

function drawMap(layer, visib) {
  if(!layer) {
    drawMap("layer1", true);
    drawMap("layer2", true);
    drawMap("layer3", true);
    return;
  }
  var Mimg = createGraphics(width - 8*32, height);
  if(layer == "layer1") mapImage1 = Mimg;
  if(layer == "layer2") mapImage2 = Mimg;
  if(layer == "layer3") mapImage3 = Mimg;

  background(0);
  if(tileset) image(tileset, 0, tilesetOffset);
  if(layers.tileset != "") {
    bimage = createGraphics(width - 8*32, height);
    bimage.pixelDensity(1);
    for(var x=0; x<wid; x++) {
      for(var y=0; y<hei; y++) {
        var xx = x*32;
        var yy = y*32;
        var cx = layers.backgroundTile.x;
        var cy = layers.backgroundTile.y;
        bimage.image(tileset, xx, yy, 32, 32, cx*32, cy*32, 32, 32);
      }
    }
    drawLayer(layer, Mimg, visib);
    image(bimage, 8*32, 0);
    image(mapImage1, 8*32, 0);
    image(mapImage2, 8*32, 0);
    image(mapImage3, 8*32, 0);
  }
  function drawLayer(lay, im, visib) {
    im.clear();
    var grey = [];
    for(var i=0; i<wid; i++) {
      grey.push([]);
      for(var j=0; j<hei; j++) {
        grey[i].push(true);
      }
    }
    for(var i=0; i<layers[lay].length; i++) {
      var t = layers[lay][i];
      var xx = t.x*32;
      var yy = t.y*32;
      var cx = t.tile.x;
      var cy = t.tile.y;
      grey[t.x][t.y] = false;
      im.image(tileset, xx, yy, 32, 32, cx*32, cy*32, 32, 32);
    }
    if(visib) return;
    im.noStroke();
    im.fill(0, 100);
    for(var i=0; i<wid; i++) {
      for(var j=0; j<hei; j++) {
        if(grey[i][j]) {
          im.rect(i*32, j*32, 32, 32);
        }
      }
    }
  }



  noFill();
  stroke(0, 150);
  var s = 4;
  strokeWeight(s);
  rect(tileX*32-s/2, tileY*32-s/2 + tilesetOffset, 32+s, 32+s);

  strokeWeight(2);
  stroke(0);
  rect(tileX*32+2, tileY*32+2 + tilesetOffset, 32, 32);
  stroke(255);
  rect(tileX*32, tileY*32 + tilesetOffset, 32, 32);
}
function make(w, h) {
  wid = w;
  hei = h;
  layers.width = wid;
  layers.height = hei;
  canvas = createCanvas(w*32 + 8*32, h*32);
  background(0);
  setCanvas();
}
