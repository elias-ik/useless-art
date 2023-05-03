/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />
/// <reference path="../p5/TSDef/opensimplex.d.ts" />

"use strict";

/** @type {OpenSimplexNoise} */
let osn;

/** @type {Grid} */
let grid;

function setup() {
  osn = new OpenSimplexNoise(Date.now());
  createCanvas(windowWidth,windowHeight);
  grid = new Grid(0, 0, width, height, 500);
  frameRate(1);
}

function draw() {
  stroke(0);
  background(255);
  grid.generate(frameCount);
  grid.drawPoints();
  // noLoop();
}

class Grid {

  /** @type {Point[][]} */
  points = [[]];

  constructor(x, y, w, h, res) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.res = res;
    this.points = [[]];
    this.generate();
  }

  generate(z = 0) {
    this.points = [[]];
    for (let i = 0; i <= this.w; i += this.res) {
      this.points.push([]);
      for (let j = 0; j <= this.h; j += this.res) {
        let x = i + this.x;
        let y = j + this.y;
        let n = osn.noise3D(x, y, z * 0.05);
        let newPoint = new Point(x, y, n);
        this.points[i/this.res].push(newPoint);
      }
    }

    for (let x = 0; x < this.points.length - 2; x++) {
      for (let y = 0; y < this.points[x].length - 2; y++) {
        let p1 = this.points[x][y];
        let p2 = this.points[x + 1][y];
        let p3 = this.points[x][y + 1];
        let p4 = this.points[x + 1][y + 1];

        //cases:
        //https://www.marckletz.at/Assets/MarchingSquares.png
        
        fill(0);

        //case 0
        if(p1.n < 0 && p2.n < 0 && p3.n < 0 && p4.n < 0){
          quad(p1.x, p1.y, p2.x, p2.y, p4.x, p4.y, p3.x, p3.y);
        }
        //case 1
        else if(p1.n < 0 && p2.n < 0 && p3.n >= 0 && p4.n < 0){
          beginShape();
          vertex(p3.x, p3.y);
          let p34 = avg(p3,p4);
          let p13 = avg(p1,p3);
          vertex(p34.x, p34.y);
          vertex(p13.x, p13.y);
          endShape(CLOSE);
        }
        //case 2
        else if(p1.n < 0 && p2.n < 0 && p3.n < 0 && p4.n >= 0){
          beginShape();
          vertex(p4.x, p4.y);
          let p12 = avg(p1,p2);
          let p24 = avg(p2,p4);
          vertex(p12.x, p12.y);
          vertex(p24.x, p24.y);
          endShape(CLOSE);
        }




        
      }
    }
    


  }

  drawPoints() {
    this.points.forEach((row) => {
      row.forEach((point) => {
        point.draw();
      });
    });
  }

}

class Point {
  constructor(x, y, n) {
    this.x = x;
    this.y = y;
    this.n = n;
  }
  draw() {
    noStroke();
    fill(map(this.n, -1, 1, 0, 255));
    ellipse(this.x, this.y, 10);
  }
}


function avg(a,b){
 return (a+b)/2;
}

function avg(p1,p2){
  return {x: avg(p1.x, p2.x), y: avg(p1.y, p2.y)};
}

function getState(a, b, c, d){
	return a*8 + b*4 + c*2 + d;
}