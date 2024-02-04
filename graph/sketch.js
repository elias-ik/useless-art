/// <reference path="../p5/TSDef/p5.global-mode.d.ts" />
/// <reference path="../p5/TSDef/opensimplex.d.ts" />

"use strict";

/** @type {OpenSimplexNoise} */
let osn = new OpenSimplexNoise(Date.now());

function drawGraph(id, data) {
  
  var element = document.getElementById(id);
  var height = element.clientHeight;
  var width = element.clientWidth
  
  new p5(function (p) {

    // START OF P5 CODE

    p.setup = function () {
      var canvas = p.createCanvas(width, height);
      canvas.parent("#" + id);
    };

    p.draw = function () {
      p.stroke(0);
      p.strokeWeight(1);
      p.line(0, 0, width, height);
    }
    
    p.windowResized = function() {
      element = document.getElementById(id);
      height = element.clientHeight;
      width = element.clientWidth    
      p.resizeCanvas(width, height);
    };

    
    // END OF P5 CODE

  }, id);
}

