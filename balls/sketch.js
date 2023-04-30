/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />

"use strict";

var balls = [];
var ballCount;

function setup() {
  createCanvas(windowWidth,windowHeight);
  let area = width * height;
  ballCount = area / 10000;
  for (let i = 0; i < ballCount; i++) {
    let r = random(5, 20);
    let x = random(r, width - r);
    let y = random(r, height - r);
    balls.push(new Ball(x,y,r));
  }

}

function draw() {
  background(255);
  balls.forEach(ball => {
    ball.show();
  });
}

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.v = p5.Vector.random2D();
    this.c = color(random(0, 255), random(0, 255), random(0, 255));
  }
  show() {
    if (this.x > width - this.r || this.x < this.r) {
      this.v.x *= -1;
    }
    if (this.y > height - this.r || this.y < this.r) {
      this.v.y *= -1;
    }
    this.x += (this.v.x * 2);
    this.y += (this.v.y * 2);
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.r * 2);
  }
}