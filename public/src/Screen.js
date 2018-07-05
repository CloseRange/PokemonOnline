var PVersion = "1.0";

var objects = [];


var Screen = {
  canvas: undefined,
  color: {
    r: 0,
    g: 0,
    b: 0
  },
  init: function() {
    Screen.canvas = createCanvas(200, 200);
    pixelDensity(1);
    window.onresize = Screen.resize;
    Screen.resize();
  },
  resize: function() {
    Screen.canvas.size(window.innerWidth, window.innerHeight);
    Screen.canvas.position(0, 0);
  },
  beginStep: function() {
    background(Screen.color.r, Screen.color.g, Screen.color.b, 255);
  }
}

function drawProperties() {
  for(var i=0; i<objects.length; i++) {
    if(objects[i].draw) objects[i].draw();
    if(objects[i].properties) {
      for(var j=0; j<objects[i].properties.length; j++) {
        if(objects[i].properties[j].draw) objects[i].properties[j].draw();
      }
    }
  }
}
function stepProperties() {
  for(var i=0; i<objects.length; i++) {
    if(objects[i].step) objects[i].step();
    if(objects[i].properties) {
      for(var j=0; j<objects[i].properties.length; j++) {
        if(objects[i].properties[j].step) objects[i].properties[j].step();
      }
    }
  }
}
function draw() {
  Screen.beginStep();
  step();
  stepProperties();
  drawProperties();
  endStep();
}
function step() {}
function endStep() {

}
