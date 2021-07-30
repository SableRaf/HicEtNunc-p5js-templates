// USER DATA TEMPLATE

// Make a piece that looks different based on who is looking at it

// p5.js template for minting on Hic et Nunc
// Made for Processing's 20th anniversary Fundraiser
// By Raphaël de Courville (@sableraph)

// hicetnunc code is adapted from https://github.com/hicetnunc2000/hicetnunc/tree/main/templates/html-p5js-template
// More hicetnunc html templates (three.js, glsl, etc) can be found at
// https://github.com/hicetnunc2000/hicetnunc/tree/main/templates

// **************************
// * HIC ET NUNC USER DATA  *
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

const DUMMY = "tz1hfuVWgcJ89ZE75ut9Qroi3y7GFJL5Lf2K"; // simulate a synced viewer (user a different address to try another viewer)
const UNSYNCED = "false"; // simulate an unsynced user

// Default is viewer. Try with DUMMY or UNSYNCED only for debugging
let viewerData = viewer;

// Check if we have a user
let viewerWasFound = viewerData && !viewerData.includes("false");

// **************************
// *       PARAMETERS       *
// **************************

// Use a random seed by default
let defaultSeed = Math.floor(Math.random() * 999999999);
//let defaultSeed = 123456789;

// Activate when publishing
p5.disableFriendlyErrors = false;

// The title of your piece goes here (not visible on hicetnunc)
document.title = "My beautiful p5.js sketch";

// **************************
// *        PRELOAD         *
// **************************

function preload() {}

// **************************
// *          SETUP         *
// **************************

function setup() {
  let viewerSeed;
  if (viewerWasFound) {
    viewerSeed = getHash(viewerData);
    console.log(`Seed: ${viewerSeed}`);
  } else {
    viewerSeed = defaultSeed;
    console.log(`No viewer found; using default seed: ${viewerSeed}`);
  }

  // Get the same random and noise value every time for a give (synced) user
  noiseSeed(viewerSeed);
  randomSeed(viewerSeed);

  createCanvas(windowWidth, windowHeight);

  noStroke();

  colorMode(HSB);

  background(0);

  let hue = random(360);

  fill(hue, 70, 80);

  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let d = random(20, 100);
    circle(x, y, d);
  }
}

// **************************
// *          DRAW          *
// **************************

function draw() {}

// **************************
// *        RESIZED         *
// **************************

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// **************************
// *         UTILS          *
// **************************

function getHash(string) {
  if (string) {
    let nameHash = string.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(nameHash);
  } else {
    return null;
  }
}
