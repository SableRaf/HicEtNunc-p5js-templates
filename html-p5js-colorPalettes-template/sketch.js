// COLOR PALETTES TEMPLATE

// p5.js template for minting on Hic et Nunc
// Made for Processing's 20th anniversary Fundraiser
// By Raphaël de Courville (@sableraph)

// hicetnunc code is adapted from https://github.com/hicetnunc2000/hicetnunc/tree/main/templates/html-p5js-template
// More hicetnunc html templates (three.js, glsl, etc) can be found at
// https://github.com/hicetnunc2000/hicetnunc/tree/main/templates

// **************************
// *        COLORS          *
// **************************

const paletteArray = [
  "https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c",
  "https://coolors.co/f94144-f3722c-f9844a-f8961e-f9c74f-90be6d-43aa8b-4d908e-577590-277da1",
  "https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557",
  "https://coolors.co/56e39f-e9ce2c-b9314f-3abeff",
  "https://coolors.co/515a6b-d6f634-fd7643-fc3b55-1787f0-fd4768-24de5f",
];

function getRandomColorsFrom(palArray) {
  let paletteString = palArray[Math.floor(Math.random() * palArray.length)];
  console.log("🎨 color palette: " + paletteString);
  let colorArray = paletteString
    .match(/[0-9a-f]{6}/g)
    .map((c) => `#${c}`)
    .map((s) => color(s));
  return colorArray;
}

let colors = [];

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

const DEFAULTSEED = 123456789;
let viewerSeed = DEFAULTSEED;

const DUMMY = "tz1hfuVWgcJ89ZE75ut9Qroi3y7GFJL5Lf2K"; // simulate a synced viewer (user a different address to try another viewer)
const UNSYNCED = "false"; // simulate an unsynced user

// Default is viewer. Try with DUMMY or UNSYNCED only for debugging
let viewerData = viewer;

// Default is creator. Try with DUMMY only for debugging
let creatorData = creator;

// Check if we have a viewer
let viewerWasFound = viewerData && !viewerData.includes("false");

// **************************
// *    GLOBAL VARIABLES    *
// **************************

let hue;

// **************************
// *       PARAMETERS       *
// **************************

// In case no viewer data is found, should we use a random seed instead of DEFAULTSEED?
let useRandomSeed = true;

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


  if (viewerWasFound) {
    viewerSeed = getHash(viewerData);
    console.log(`Seed: ${viewerSeed}`);
  } else if (useRandomSeed) {
    viewerSeed = Math.floor(Math.random() * 999999999);
    console.log(`No viewer found; using random seed: ${viewerSeed}`);
  }

  colors = getRandomColorsFrom(paletteArray);

  // Use the same random and noise values every time for a given (synced) viewer
  noiseSeed(viewerSeed);
  randomSeed(viewerSeed);

  createCanvas(windowWidth, windowHeight);

  noStroke();

  background(0);

  hue = random(360);
}

// **************************
// *          DRAW          *
// **************************

function draw() {

  let x = random(width);
  let y = random(height);


  // Display the hicetnunc data & our user-dependent variable(s)
  let txtSize = 16;
  push();
  stroke(0);
  fill(255);
  textSize(txtSize);
  text(`NFT created by: ${creator}`, txtSize, txtSize * 2);
  text(`NFT viewed by: ${viewerData}`, txtSize, txtSize * 3);
  let suffix = "";
  if (!viewerWasFound) {
    suffix = "(default)";
    if (useRandomSeed) {
      suffix = "(random)";
    }
  }
  text(`Seed: ${viewerSeed} ${suffix}`, txtSize, txtSize * 4);
  pop();
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
