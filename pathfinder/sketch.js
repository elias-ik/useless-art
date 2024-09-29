/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />
/// <reference path="../p5/TSDef/opensimplex.d.ts" />

"use strict";

// /** @type {OpenSimplexNoise} */
// let osn = new OpenSimplexNoise(Date.now());
var V1;
var V2;
var dragObject = 0;
let Radius = 50;
let DirectionDrawLength = 50
let a1Slider;
let a2Slider;
function setup() {
  a1Slider = createSlider(0,100,50)
  a1Slider.position(10, 10);
  a2Slider = createSlider(0,100,50)
  a2Slider.position(10, 40);
   a2Slider.style('color', 'red');
  createCanvas(800, 800);
  V1 = {
    x: -200, y: 200, a: TAU * 0.1
  };  
  V2 = {
    x: 100, y: -100, a: TAU * 0.3
  };  
  noFill();
}

var dir = false

function draw() {
  background(0);

  repos()

  translate(width/2, height/2); 
  scale(1, -1);

  stroke(255); 
  
  line(-10,0,10,0)
  line(0,10,0,-10)
  stroke('lightblue')
  DrawDirVector(V1)
  stroke('red')
  DrawDirVector(V2)
  let c1s = CalcCircles(V1)
  let c2s = CalcCircles(V2)
  c1s.forEach(c => {
    DrawCircle(c, true)
  })
  c2s.forEach(c => {
    DrawCircle(c, true)
  })
  c1s.forEach(c1 => {
    c2s.forEach(c2 => {
      let ts = CalcTangents(c1, c2)
      ts.forEach(t => {
        let v = CalcVector(t, c1, c2)
        let sourceOk = CalcCorrectness(c1, v)
        let targetOk = CalcCorrectness(c2, v)
        //add calc arc distance
        
        if(sourceOk && targetOk){
          var sad = CalcArcDistance(c1, {x: V1.x, y: V1.y}, {x: v.x1, y: v.y1})
          var tad = CalcArcDistance(c2, {x: V2.x, y: V2.y}, {x: v.x2, y: v.y2})
          var vd = getVectorMagnitude(v)
          var total = sad + tad + vd

          // print(sad, vd, tad)
          DrawVector(v)
        }
      })
    })
  })
  
  // noLoop()
}


function CalcArcDistance(c, sp, ep){
  var as = angleToAxis(sp.x, sp.y)
  var ae = angleToAxis(ep.x, ep.y)
  // print(sp)
  if(ae > as) {
    ae -= TAU
  }
  var arc = 0
  if(c.dir == Dir.CW){
    arc = as - ae
  } else {
    arc = ae - as
  }

  if(arc < TAU){
    arc += TAU
  }  
  
  let p = arc / TAU
  
  let cir = 2 * PI * c.r
  let absCir = cir * p
  return absCir
}

/*
  Definitions
  
  Cirlce = x, y, r
  Line = ax + by + c == 0
  Point = x, y
  DirectionalVector = x, y, a
  Vector = x1, y1, x2, y2
*/

const Dir = {
  CW: "Clockwise",
  CCW: "CounterClockwise"
}

//Vector

function DrawDirVector(v){
  strokeWeight(10);
  let tx = DirectionDrawLength * cos(v.a)
  let ty = DirectionDrawLength * sin(v.a)
  point(v.x,v.y)
  strokeWeight(1);

  line(v.x,v.y,tx+v.x,ty+v.y)
}

// Circles
function CalcCircles(v){
  var nA1 = v.a + ( TAU / 4 );
  let ox = Radius * cos(nA1);
  let oy = Radius * sin(nA1);
  var nx1 = v.x + ox;
  var ny1 = v.y + oy;
  var nx2 = v.x - ox;
  var ny2 = v.y - oy;
  var cs = [];
  cs.push({ x: nx1, y: ny1, r: Radius, dir: Dir.CCW  });
  cs.push({ x: nx2, y: ny2, r: Radius, dir: Dir.CW   });
  return cs;
}
function DrawCircle(c, dot = false){
  strokeWeight(1);
  stroke(255);
  ellipse(c.x, c.y, c.r*2, c.r*2);
  if(dot){
    strokeWeight(5);
    point(c.x, c.y);
  }
}

//Tangents
function CalcTangents(c1, c2){
  return common_tangent_line(c1.x, c1.y, c1.r, c2.x, c2.y, c2.r)
}

//Line 
function DrawLine(l){
  let x1 = -width/2
  let y1 = calc_y(x1, l.a, l.c, l.b)
  let x2 = width/2
  let y2 = calc_y(x2, l.a, l.c, l.b)
  stroke(255)
  strokeWeight(1)
  line(x1, y1, x2, y2);
}

function CalcIntersectingPointToLine(l, p){
  return intersectingPoint(l, p.x, p.y)
}

//Vector
function CalcVector(l, c1, c2){
  let p1 = CalcIntersectingPointToLine(l, {x: c1.x, y: c1.y})
  let p2 = CalcIntersectingPointToLine(l, {x: c2.x, y: c2.y})
  return {
    x1: p1.x,
    y1: p1.y,
    x2: p2.x,
    y2: p2.y,
  }
}
function DrawVector(v){
  strokeWeight(1)
  line(v.x1, v.y1, v.x2, v.y2);
}

function CalcCorrectness(c, v){
  
  let sx = v.x1
  let sy = v.y1
  let tx1 = c.x
  let ty1 = c.y
  let tx2 = v.x2
  let ty2 = v.y2
  
  let vx1 = tx1 - sx
  let vy1 = ty1 - sy
  var a1 = angleToAxis(vx1, vy1)
  
  let vx2 = tx2 - sx
  let vy2 = ty2 - sy
  let a2 = angleToAxis(vx2, vy2)
  
  let adiff = a2 - a1
  let isLarge = (adiff > 0) ? (adiff > PI) : (adiff * -1 < PI)
  let result = (isLarge && c.dir == Dir.CCW) || (!isLarge && c.dir == Dir.CW)
  return result
}



function intersectingPoint(l, xp, yp){
  let x1 = 0
  let y1 = calc_y(x1, l.a, l.c, l.b)
  let x2 = width
  let y2 = calc_y(x2, l.a, l.c, l.b)
  
  let slope = (y1 - y2) / (x1 - x2)
  let m = -1 / slope
  let x = (m * xp - yp - slope * x1 + y1) / (m - slope)
  let y = m * x - m * xp + yp
  return createVector(x, y)
}

function calc_y(x, a, c, b) {
  return ( -a*x + -c ) / b;  
}

function common_tangent_line(x1, y1, r1, x2, y2, r2) {
  // Compute the common tangent line of two circles: (x1, y1) - r1 and (x2, y2) - r2
  // Return in the form of line equation: ax + by + c == 0
  // y = -ax - c 
  let delta1 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) - (r1 + r2) * (r1 + r2);
  let delta2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) - (r1 - r2) * (r1 - r2);
  let p1 = r1 * (x1 * x2 + y1 * y2 - x2 * x2 - y2 * y2);
  let p2 = r2 * (x1 * x1 + y1 * y1 - x1 * x2 - y1 * y2);
  let q = x1 * y2 - x2 * y1;
  let results = [];
  if(delta1 >= 0) {
    let l11 = {
      a: (x2 - x1) * (r1 + r2) + (y1 - y2) * Math.sqrt(delta1),
      b: (y2 - y1) * (r1 + r2) + (x2 - x1) * Math.sqrt(delta1),
      c: p1 + p2 + q * Math.sqrt(delta1)
    };
    let l12 = {
      a: (x2 - x1) * (r1 + r2) - (y1 - y2) * Math.sqrt(delta1),
      b: (y2 - y1) * (r1 + r2) - (x2 - x1) * Math.sqrt(delta1),
      c: p1 + p2 - q * Math.sqrt(delta1)
    };
    results.push(l11);
    results.push(l12);
  }
  if(delta2 >= 0) {
    let l21 = {
      a: (x2 - x1) * (r1 - r2) + (y1 - y2) * Math.sqrt(delta2),
      b: (y2 - y1) * (r1 - r2) + (x2 - x1) * Math.sqrt(delta2),
      c: p1 - p2 + q * Math.sqrt(delta2)
    };
    let l22 = {
      a: (x2 - x1) * (r1 - r2) - (y1 - y2) * Math.sqrt(delta2),
      b: (y2 - y1) * (r1 - r2) - (x2 - x1) * Math.sqrt(delta2),
      c: p1 - p2 - q * Math.sqrt(delta2)
    };
    results.push(l21);
    results.push(l22);
  }
  return results;
}

function angleToAxis(x1, y1) {
  var offset = 0;
  if(x1 > 0 && y1 > 0){ //top rigth 0 - PI/2
    offset = 0;
  } else if(x1 < 0 && y1 > 0){ //top left -PI/2 - 0
    offset = PI; 
  } else if(x1 < 0 && y1 < 0){ //bottom left 0 - PI/2
    offset = PI; 
  } else { // bottom right 
    offset = TAU;
  }
  let a = Math.atan(y1 / x1) + offset
  return a
}
function getVectorMagnitude(line) {
  const xDiff = line.x2 - line.x1;
  const yDiff = line.y2 - line.y1;
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}



//Move Controls

function mx(){
  return mouseX - width/2
}

function my(){
  return (mouseY - width/2) * -1
}

function mousePressed(){
  let dvx1 = mx() - V1.x
  let dvy1 = my() - V1.y
  let dvx2 = mx() - V2.x
  let dvy2 = my() - V2.y
  let dv1 = Math.sqrt(dvx1*dvx1 + dvy1*dvy1)
  let dv2 = Math.sqrt(dvx2*dvx2 + dvy2*dvy2)
  if(dv1 < 10){
    dragObject = 1;
  }
  if(dv2 < 10){
    dragObject = 2;
  }
}

function mouseReleased(){
  dragObject = 0;
}

function repos(){
  fill(200)
  textSize(25);
  text('Drag the center point around to move positions\r\nDrag the sliders to rotate', 170, 20);
  rect(0, 0, 155, 70)
  noFill()
  if(dragObject == 1){
    V1.x = mx()
    V1.y = my()
  }
  if(dragObject == 2){
    V2.x = mx()
    V2.y = my()
  }
  V1.a = TAU * a1Slider.value() / 100 * -1
  V2.a = TAU * a2Slider.value() / 100 * -1
}


