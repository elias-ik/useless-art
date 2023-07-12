/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />
/// <reference path="../p5/TSDef/opensimplex.d.ts" />

"use strict";

/** @type {OpenSimplexNoise} */
let osn;

var o = 0;

function setup() {
  osn = new OpenSimplexNoise(Date.now());
  createCanvas(windowWidth,windowHeight);
  frameRate(30);
}

var dict = {};
let steps = 4;
let speed = 0.03;
let scale = 0.03;

function draw() {
  stroke(0);
  strokeWeight(1);
  background(0);
  dict = {};
  stroke(255);
  noFill();
  for(var i = 0; i < steps; i++){
    beginShape();
    for(var j = 0; j < width; j+=1){
      var d = 1 - abs(j - width/2) / (width/2);
      var n = osn.noise2D(j * scale * (i+1)/steps, o + i * 100) * 50 * ((steps - i) / steps) * d;
      var y = height/steps * i + (height/steps/2) + n;
      if(dict[j] == undefined) {
        dict[j] = n; } else {
        dict[j] += n; }
      var x = j; 
      var distance = sqrt(pow(x - width/2, 2) + pow(y - height/2, 2));
      if(distance < min(width, height)/2){
        vertex(x, y);
      }
    }
    endShape();
  }
  o+=speed;
  strokeWeight(5);

  beginShape();
  for(var j = 0; j < width; j++){
    var i = min(height,width) * (j / width) + (width - min(height,width)) / 2
    console.log(width, height, i);
    vertex(i, height/2 + dict[j]);
  }
  endShape();
  // noLoop();
}
