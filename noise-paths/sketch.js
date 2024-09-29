/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />
/// <reference path="../p5/TSDef/opensimplex.d.ts" />

"use strict";

/** @type {OpenSimplexNoise} */
let OS;
let sideLenght;

function setup() {
  sideLenght = min(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  stroke(0);
  background(255);
  strokeWeight(2);
  noFill();
  frameRate(1);
  draw();
}
var off = 0; 
let filler = 0.5; // in percent
let tracesPerFrame = 150; 
let pointsPerTrace = 100; 
let scl = 0.004;
let stepSize = 1;
function draw() {
  if(windowWidth == sideLenght){    
    translate(0,(windowHeight - windowWidth)/2);
  }else{    
    translate((windowWidth - windowHeight)/2, 0);
  }
  background(255);
  OS = new OpenSimplexNoise(Date.now());

  var i = tracesPerFrame;
  while (i-- > 0) {
    let min = (sideLenght / 2) * filler;
    let max = sideLenght - min;
    var x = random(min, max);
    var y = random(min, max);
    beginShape();
    vertex(x,y);
    var j = pointsPerTrace;
    while(j-- > 0){
      var a = OS.noise2D(x*scl,y*scl) * TAU;
      x = x + (sin(a) * stepSize);
      y = y + (cos(a) * stepSize);
      vertex(x,y);
    }
    endShape();
  }
}