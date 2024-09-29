/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />
/// <reference path="../p5/TSDef/opensimplex.d.ts" />

"use strict";

/** @type {OpenSimplexNoise} */
let osn = new OpenSimplexNoise(Date.now());


function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(1000)
}

//current velocity
var vx = 0

//maximally allowed velocity
var vMax = 10

//maximally allowed acceleration
var aMax = 0.1

//current position
var x = 0

//target position
var tx = 0

function draw() {
  
  //draw background
  background(50)
  
  //set brush properties
  stroke(190)
  strokeWeight(10)
  
  //set new target position to current mouse position
  tx = mouseX
  
  //calculate distance to target (if target is to the left distance is negative)
  var dx = tx-x
  
  //accelerate in the direction of the distance, 
  //but limit the acceleration to the maximally allowed acceleration
  var ax = limitRange(dx, aMax)

  //if our current velocity (vx) is towards the target,
  // instead of away from the target
  if(sameSide(dx,vx)){
    
    //calculate the break distance if we hit the breaks as hard as we can 
    // (aka accelerate away from the object)
    var bdx = sq(vx) / (2 * aMax)
    
    //if our breakdistance is the same distance as our current distance
    // -> we need to break
    if(abs(bdx) >= abs(dx)){
      
      //acceleration will be set to the maximum away from the target, 
      // since we need to break as hard as we can
      ax = dx > 0 ? -aMax : aMax
      
    }

  }
  
  //apply acceleration to velocity
  vx += ax
  
  //limit velocity to the maximally allowed velocity
  vx = limitRange(vx, vMax);
  
  //apply velocity to position
  x += vx
  
  //show position
  point(x, 300)

}


//checks if two variables are on the same side of zero
// -1, -2 = true
// 2, -1 = false
// 2, 5, = true
function sameSide(a,b){
  return a * b > 0
}

//limits the range of a number to set maximum, both below and above zero
//-1,5 = -1
//-6,5 = -5
//8,5 = 5
//-3,7 = -3
function limitRange(v, l){
  if(v < -l){
    return -l;
  } 
  if(v > l){
    return l;
  }
  return v;
}