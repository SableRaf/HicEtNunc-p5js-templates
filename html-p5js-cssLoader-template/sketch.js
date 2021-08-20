// CSS LOADER TEMPLATE

// p5.js template for minting on Hic et Nunc
// Made for Processing's 20th anniversary Fundraiser
// By Raphaël de Courville (@sableraph)

// CSS loader code adapted from the ThreeJS loader by Michael Herzog (Mugen87)
// post: https://stackoverflow.com/questions/49643660/threejs-loading-screen
// demo: https://jsfiddle.net/vfug1adn/19/

// **************************
// *       PARAMETERS       *
// **************************

// Set this to true when minting
p5.disableFriendlyErrors = false;

// The title of your piece goes here (not visible on hicetnunc)
document.title = "My beautiful p5.js sketch";

// **************************
// *    GLOBAL VARIABLES    *
// **************************

let img;

// **************************
// *        PRELOAD         *
// **************************

function preload() {
  // Image Credit: Cassini Imaging Team, SSI, JPL, ESA, NASA
  // https://www.nasa.gov/image-feature/jpl/pia17213/farewell-to-mimas
  img = loadImage("images/mimas.jpg");
}

// **************************
// *          SETUP         *
// **************************

function setup() {
  // grab the loader element from the DOM
  let loadingScreen = document.getElementById("loading-screen");

  // fade out the loader
  loadingScreen.classList.add("fade-out");

  // optional: remove loader from DOM via event listener
  loadingScreen.addEventListener("transitionend", () => {
    const element = event.target;
    element.remove();
  });

  createCanvas(windowWidth, windowHeight);
}

// **************************
// *          DRAW          *
// **************************

function draw() {
  background(0);
  let imgSize = min(width, height);
  image(img, 0, 0, imgSize, imgSize);
}

// **************************
// *         RESIZE         *
// **************************

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
