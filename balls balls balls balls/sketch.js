/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />

"use strict";

var balls = [];

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  for(var i = 0; i < 100; i++){
    let x = random(0, width);
    let y = random(0, height);
    let r = random(10, 20);
    let w = random(1, 20);
    var ball = new Ball(x, y, r, w, balls);
    ball.velocity = createVector(random(-2, 2), random(-2, 2));
    var overlapping = false;
    for (let other of balls) {
      let d = dist(ball.x, ball.y, other.x, other.y);
      if (d < ball.radius + other.radius) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) {
      balls.push(ball);
    }
  }
}

function draw() {
  background(255);
  let gravity = createVector(0, 0.1);
  balls.forEach(ball => {
    ball.applyAcceleration(gravity);
    ball.update();
    ball.show();
  });
}

class Ball {

  constructor(x, y, r, weight, others) {
    this.x = x;
    this.y = y;
    this.weight = weight;
    this.velocity = createVector(0, 0);
    this.others = others;
    this.radius = r;
    this.c = color(random(0, 255), random(0, 255), random(0, 255));
  }

  show() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.radius * 2);
  }

  applyVelocity() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  applyAcceleration(acceleration) {
    this.velocity.add(acceleration);
  }

  checkEdges() {
    if (this.x + this.radius > width) {
      this.x = width - this.radius;
      this.velocity.x *= -1;
    } else if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.velocity.x *= -1;
    }
    if (this.y + this.radius > height) {
      this.y = height - this.radius;
      this.velocity.y *= -1;
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.velocity.y *= -1;
    }
  }

  checkCollision() {
    for (let other of this.others) {
      if (other !== this) {
        let d = dist(this.x, this.y, other.x, other.y);
        if (d < this.radius + other.radius) {
          let normal = createVector(other.x - this.x, other.y - this.y);
          normal.normalize();
          let relativeVelocity = createVector(this.velocity.x - other.velocity.x, this.velocity.y - other.velocity.y);
          let dot = p5.Vector.dot(relativeVelocity, normal);
          let impulse = (2 * dot) / (1 / this.weight + 1 / other.weight);
          let impulseVector = p5.Vector.mult(normal, impulse);
          this.velocity.sub(p5.Vector.div(impulseVector, this.weight));
          other.velocity.add(p5.Vector.div(impulseVector, other.weight));
          
          while (dist(this.x, this.y, other.x, other.y) < this.radius + other.radius) {
            var overlap = this.radius + other.radius - d;
            var travelVector = createVector(this.x - this.previousX, this.y - this.previousY);
            var travelDistance = travelVector.mag();
            var otherTravelVector = createVector(other.x - other.previousX, other.y - other.previousY);
            var otherTravelDistance = otherTravelVector.mag();
            var percent = travelDistance / (travelDistance + otherTravelDistance);
            this.x -= travelVector.x * percent;
            this.y -= travelVector.y * percent;
            other.x -= otherTravelVector.x * (1-percent);
            other.y -= otherTravelVector.y * (1-percent);
          }
          console.log(overlap);          
        }
      }
    }  
  }

  update() {
    this.previousX = this.x;
    this.previousY = this.y;
    this.applyVelocity();
    this.checkEdges();
    this.checkCollision();
  }
}
