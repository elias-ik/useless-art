/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />

"use strict";

var r;

function setup() {  
  createCanvas(windowWidth, windowHeight);
  background(0);
  r = height * 0.45;
  frameRate(30);
}


function draw(){
  translate(width / 2, height / 2);
  for(var i = 0; i < 10000; i++){
    var randomDistanceToCenter = sqrt(sqrt(random(0, 1))) * r;
    var angle = random(0, TWO_PI);
    var x = randomDistanceToCenter * cos(angle);
    var y = randomDistanceToCenter * sin(angle);
    stroke(255);
    strokeWeight(1);
    point(x, y);
    console.log(x, y);
  }
  point(0, 0);

}