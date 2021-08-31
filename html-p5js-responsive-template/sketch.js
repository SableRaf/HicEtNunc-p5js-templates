// RESPONSIVE SQUARE TEMPLATE

// This template shows a combination of three useful tricks:
//
//   1. draw a square canvas that fits in the current window
//   2. scale the content based on the canvas size
//   3. center the canvas within the page
//
// Try resizing your sketch window to see the effect

// p5.js template for minting on Hic et Nunc
// Made for Processing's 20th anniversary Fundraiser
// By Raphaël de Courville (@sableraph)
// Find the latest version at https://github.com/SableRaf/HicEtNunc-p5js-templates

// 🤓 Note: replace thumbnail.png with your own thumbnail (512×512 pixels is best)

// **************************
// *       PARAMETERS       *
// **************************

// Set this to true when minting
p5.disableFriendlyErrors = false;

// The title of your piece goes here (not visible on hicetnunc)
document.title = "My beautiful p5.js sketch";

// Default size of your canvas (windowScale = 1.0)
const referenceSize = 600;

// if true, then the canvas cannot be larger than the reference size
const hasMaxSize = false;

// if true the canvas will be vertically and horizontally centered inside the window
const isCentered = true;

// **************************
// *    GLOBAL VARIABLES    *
// **************************

var canvasSize;
var windowScale;
var fullScreen;

// **************************
// *        PRELOAD         *
// **************************

function preload() {}

// **************************
// *          SETUP         *
// **************************

function setup() {
  setDimensions();
  if (isCentered) {
    centerCanvas();
  }
  createCanvas(canvasSize, canvasSize);
}

// **************************
// *          DRAW          *
// **************************

function draw() {
  background(220);

  var strokeW = 10 * windowScale; // the stroke will be 10 px when canvasSize == referenceSize
  var fontSize = 20 * windowScale; // the fontsize will be 40 when canvasSize == referenceSize

  // 💫sometimes it's more intuitive to deal with percentages of the canvas size
  var diameter = 0.8 * canvasSize; // here the circle's diameter is 80% of the canvas size

  // draw the content
  translate(width / 2, height / 2);
  fill("white");
  strokeWeight(strokeW);
  ellipse(0, 0, diameter);
  textSize(fontSize);
  textAlign(CENTER);
  fill("black");
  text("Canvas size = " + canvasSize, 0, -fontSize);
  text("Window scale = " + windowScale.toFixed(2), 0, fontSize);

  var notFS = fullScreen ? " " : " not ";
  if (fullScreen) {
    fill(20, 200, 150);
  } else {
    fill(220, 10, 150);
  }
  text(`The sketch is${notFS}full screen`, 0, 3 * fontSize);

  // Create a screen reader accessible description for the canvas
  describe(
    `A black circle on a white background with the following text:` +
      `\nCanvas size = ${canvasSize}` +
      `\nWindow scale = ${windowScale.toFixed(2)}`
  );
}

// **************************
// *        RESIZE          *
// **************************

function windowResized() {
  setDimensions();
  resizeCanvas(canvasSize, canvasSize);
}

// **************************
// *         INPUT          *
// **************************

// Find key codes at http://keycode.info/
function keyPressed() {
  if (keyCode === 82) {
    console.log("R was pressed");
  } else if (keyCode === 67) {
    console.log("C was pressed");
  }
}

// **************************
// *         UTILS          *
// **************************

function setDimensions() {
  fullScreen = isFullscreen();

  // This is how we constrain the canvas to the smallest dimension of the window
  // Thanks to Maxim Schoemaker for this trick! twitter.com/MaximSchoemaker - maximschoemaker.com
  canvasSize = min(windowWidth, windowHeight);

  if (hasMaxSize) {
    canvasSize = min(referenceSize, canvasSize);
  }

  // windowScale goes from 0.0 to 1.0 as canvasSize goes from 0.0 to referenceSize
  // if hasMaxSize is set to true, it will be clamped to 1.0 otherwise it keeps growing over 1.0
  windowScale = map(canvasSize, 0, referenceSize, 0, 1, hasMaxSize);
}

function centerCanvas() {
  var s = document.body.style;
  s.display = "flex";
  s.overflow = "hidden";
  s.height = "100vh";
  s.alignItems = "center";
  s.justifyContent = "center";
}

function isFullscreen() {
  if (
    document.fullscreenElement ||
    window.screen.height - window.innerHeight <= 3 ||
    isEdgeFullscreen() ||
    isSafariFullscreen()
  ) {
    return true;
  }
  return false;
}

function isSafariFullscreen() {
  if (document.webkitIsFullScreen) {
    return true;
  }
  return false;
}

function isEdgeFullscreen() {
  if (isUserAgent("Edg") && window.screen.height - window.innerHeight <= 235) {
    return true;
  }
  return false;
}

function isUserAgent(name) {
  if (window.navigator.userAgent.indexOf(name) > -1) {
    return true;
  }
  return false;
}

// toggle fullscreen (for testing)
// function mousePressed() {
//   let fs = fullscreen();
//   fullscreen(!fs);
// }