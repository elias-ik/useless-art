/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />
/// <reference path="../p5/TSDef/opensimplex.d.ts" />

"use strict";

/** @type {OpenSimplexNoise} */
let osn = new OpenSimplexNoise(Date.now());

var o = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(25);
}

var noiseOffset = 0;

function draw() {
  background(color('#101EE2'));
  var newX = width * 0.2;
  var newY = height * 0.8;
  translate(newX, newY);
  stroke(255);
  strokeWeight(1);
  noFill();
  
  var noises = {};
  //precalculate noise 
  var noiseStrength = 1.6;
  for (let angle = 0; angle < TWO_PI; angle += 0.01) {
    var x = cos(angle) * noiseStrength;
    var y = sin(angle) * noiseStrength;
    var n = osn.noise3D(x, y, noiseOffset) * 50;
    noises[angle] = n;
  }

  for(let i = 0; i < 10; i++){
    beginShape();
    let radius = 50 + height*0.8 * (i/10);
    stroke(255, 255, 255, 255 * (1 - i/10));
    for (let angle = 0; angle < TWO_PI; angle += 0.01) {
      var x = (radius * (1 + noises[angle] * 0.02)) * cos(angle);
      var y = (radius * (1 + noises[angle] * 0.02)) * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
  
  }
  noiseOffset += frameRate() / 4000;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}