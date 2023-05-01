/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />

"use strict";

let OS;
let r;
let steps = 500;

var pos = 0;

function setup() {
  
  OS = new OpenSimplexNoise(Date.now());
  createCanvas(windowWidth,windowHeight);

  r = min(width, height) / 3;

}


function draw() {
  stroke(0);
  background(255);
  translate(width / 2, height / 2);

  let lineCount = 60;
  for (let i = 0; i < lineCount; i++) {
    drawBlowIGuess(pos + (i * 1.5),  i * (1 / lineCount));
  }

  pos++;

}


function drawBlowIGuess(n_pos, opacity){
  let steps_ = steps * (1 - opacity);
  noFill();
  stroke(opacity * 255)
  beginShape();
  for (let i = 0; i < steps_; i++) {
    let angle = i * TWO_PI / steps_;
    
    let noise_x = r * 0.01 * cos(angle);
    let noise_y = r * 0.01 * sin(angle);
  
    let noise = OS.noise3D(noise_x, noise_y, n_pos * 0.05) * 100;
    let x = (r + noise) * cos(angle) * (1 - opacity)  ;
    let y = (r + noise) * sin(angle) * (1 - opacity);
    vertex(x, y);
  }
  endShape(CLOSE);
}