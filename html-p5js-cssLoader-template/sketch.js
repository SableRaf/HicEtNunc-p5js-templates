// BASIC TEMPLATE

// p5.js template for minting on Hic et Nunc
// Made for Processing's 20th anniversary Fundraiser
// By Raphaël de Courville (@sableraph)

// hicetnunc code is adapted from https://github.com/hicetnunc2000/hicetnunc/tree/main/templates/html-p5js-template
// More hicetnunc html templates (three.js, glsl, etc) can be found at
// https://github.com/hicetnunc2000/hicetnunc/tree/main/templates

// CSS loader code adapted from the ThreeJS loader by Michael Herzog (Mugen87)
// post: https://stackoverflow.com/questions/49643660/threejs-loading-screen
// demo: https://jsfiddle.net/vfug1adn/19/

// **************************
// *       PARAMETERS       *
// **************************

// Activate when publishing
p5.disableFriendlyErrors = false;

// The title of your piece goes here (not visible on hicetnunc)
document.title = "My beautiful p5.js sketch";

// **************************
// *    GLOBAL VARIABLES    *
// **************************

let img;

// **************************
// *        LOADER          *
// **************************

function fadeOutLoadingScreen() {
  // grab the loader element from the DOM
  let loadingScreen = document.getElementById("loading-screen");

  // fade out the loader
  loadingScreen.classList.add("fade-out");

  // optional: remove loader from DOM via event listener
  loadingScreen.addEventListener("transitionend", () => {
    const element = event.target;
    element.remove();
  });
}

// **************************
// *        PRELOAD         *
// **************************

function preload() {
  // loading the image a bunch of times to simulate loading a larger file
  // remove the for loop in your own sketch
  for (let i = 0; i < 1000; i++) {
    // Image Credit: Cassini Imaging Team, SSI, JPL, ESA, NASA
    // https://www.nasa.gov/image-feature/jpl/pia17213/farewell-to-mimas
    img = loadImage("images/mimas.jpg");
  }
}

// **************************
// *          SETUP         *
// **************************

function setup() {
  fadeOutLoadingScreen();
  createCanvas(windowWidth, windowHeight);
}

// **************************
// *          DRAW          *
// **************************

function draw() {
  background(0);
  let size = min(width, height);
  image(img, 0, 0, size, size);
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

// **************************
// *     ACCESSIBILITY      *
// **************************

// We keep focus outlines active for keyboard users (see css)
function detectKeyboardUser(e) {
  // If user presses tab
  if (e.keyCode === 9) {
    console.log("Keyboard user detected");
    document.body.classList.add("keyboardNav");
    window.removeEventListener("keydown", detectKeyboardUser);
  }
}
window.addEventListener("keydown", detectKeyboardUser);

// **************************
// * HIC ET NUNC VARIABLES  *
// **************************

// If you want to create OBJKT's with different seeds,
// you can access the creator and viewer wallet ids.
// This values will only be injected once the piece has been minted
// they will not work locally.
const creator = new URLSearchParams(window.location.search).get("creator");
const viewer = new URLSearchParams(window.location.search).get("viewer");
// NOTE: if the user is viewing the page on hicetnunc while unsynced,
// the viewer variable will return a string of value "false" (NOT a boolean)

console.log("NFT created by", creator); // null if local
console.log("NFT viewed by", viewer); // null if local
