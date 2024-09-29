/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />
/// <reference path="../p5/TSDef/opensimplex.d.ts" />

"use strict";

let stars = [];
let starAmount = 1000;
let img;
function setup() {
  var sideLenght = min (windowWidth, windowHeight);
  let canvas = createCanvas(sideLenght, sideLenght, WEBGL);
    for (let i = 0; i < starAmount; i++) {
    stars.push(new Star());
  }
  img = loadImage('/starship/ship.png');
  
  frameRate(60);
}


function draw() {
  background(0);
    let h = 100;
  img.resize(img.width*h/img.height, h)

  stroke(255)
  for (let i = 0; i < stars.length; i++) {   
    stars[i].display();
    stars[i].move();
  }
  push();
  translate(random(-1.5,1.5),random(-1.5,1.5),-95);
  rotate(TWO_PI * 0.05);
  texture(img); 
  noStroke();
  plane(img.width, img.height);
  pop();
  //noLoop();
}

function randomInSpace(){
  return random(-1000, 1000);
}


class Star {
  
  constructor() {
    this.spaceSize = 1000;
    this.x = random(-this.spaceSize, this.spaceSize);
    this.y = random(-this.spaceSize, this.spaceSize);
    this.z = random(0, this.spaceSize);
    this.speed = random(10,60); //CHANGE SPEED HERE
  }
  move(){
    this.x += this.speed;
    this.z -= this.speed;
    this.y -= this.speed *0.25;
    if(this.x > this.spaceSize*2){
      if(random() > 0.5){
        this.x = random(-this.spaceSize, this.spaceSize);
        this.y = random(-this.spaceSize, this.spaceSize);
        this.z = 0;
      }else{
        this.x = -this.spaceSize;
        this.y = random(-this.spaceSize, this.spaceSize);
        this.z = random(0, this.spaceSize);
      }
      if(random() > 0.5){
        this.x -= this.spaceSize;
      }
      if(random() > 0.7){
        this.x = random(-25,25);
        this.y = random(-25,25);
        this.z = -100;
      }
    }
    
    
  }
  display(){
    push();
    stroke(255)
    translate(this.x,this.y,this.z);
    sphere(1);
    pop();
  }
}