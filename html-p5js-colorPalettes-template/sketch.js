// COLOR PALETTES TEMPLATE

// p5.js template for minting on Hic et Nunc
// Made for Processing's 20th anniversary Fundraiser
// By Raphaël de Courville (@sableraph)

// hicetnunc code is adapted from https://github.com/hicetnunc2000/hicetnunc/tree/main/templates/html-p5js-template
// More hicetnunc html templates (three.js, glsl, etc) can be found at
// https://github.com/hicetnunc2000/hicetnunc/tree/main/templates

// **************************
// *        COLOR           *
// **************************

const paletteArray = [
  "011627-fdfffc-2ec4b6-e71d36-ff9f1c",
  "f94144-f3722c-f9844a-f8961e-f9c74f-90be6d-43aa8b-4d908e-577590-277da1",
  "e63946-f1faee-a8dadc-457b9d-1d3557",
  "56e39f-e9ce2c-b9314f-3abeff",
  "515a6b-d6f634-fd7643-fc3b55-1787f0-fd4768-24de5f",
];
let colorPalette = [];

function loadPalette() {
  let newIndex = ~~random(paletteArray.length);
  while (newIndex === paletteIndex) {
    newIndex = ~~random(paletteArray.length);
  }
  paletteIndex = newIndex;
  let colorString = paletteArray[paletteIndex];
  colorPalette = colorString.match(/[0-9a-f]{6}/g).map((c) => `#${c}`);
  console.log("Color palette: " + colorPalette);
}

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

// Set this to true when minting
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

  // Use the same random and noise values every time for a given (synced) viewer
  noiseSeed(viewerSeed);
  randomSeed(viewerSeed);

  createCanvas(windowWidth, windowHeight);

  noStroke();

  colorMode(HSB);

  background(0);

  let hue = random(360);

  fill(hue, 70, 80);
}

// **************************
// *          DRAW          *
// **************************

function draw() {
  translate(width / 2, height / 2);

  let angle = (frameCount * 0.12) / TWO_PI;

  let scale = min(width, height);

  noiseDetail(4, 0.5);
  let noiseX = cos(angle) + 1;
  let noiseY = sin(angle) + 1;
  let n = noise(noiseX, noiseY);
  let s = scale * 0.1 * n;

  noiseDetail(2, 0.1);
  n = noise(noiseX, noiseY);
  let r = 0.33 * scale - n * 200;
  let x = cos(angle) * r;
  let y = sin(angle) * r;

  circle(x, y, s);
}

// **************************
// *        RESIZED         *
// **************************

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
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
