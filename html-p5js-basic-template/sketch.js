// Activate when publishing
p5.disableFriendlyErrors = true;

// **************************
// *       PARAMETERS       *
// **************************

// **************************
// *    GLOBAL VARIABLES    *
// **************************

// **************************
// *        PRELOAD         *
// **************************

function preload() {}

// **************************
// *          SETUP         *
// **************************

function setup() {
  createCanvas(windowWidth, windowHeight);
}

// **************************
// *          DRAW          *
// **************************

function draw() {
  background(0);
  translate(width / 2, height / 2);
  circle(0, 0, sin(frameCount * 0.01) * min(width, height));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
