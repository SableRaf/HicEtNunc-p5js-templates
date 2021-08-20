// USER DATA TEMPLATE

// Make a piece that looks different based on who is looking at it

// p5.js template for minting on Hic et Nunc
// Made for Processing's 20th anniversary Fundraiser
// By Raphaël de Courville (@sableraph)
// Find the latest version at https://github.com/SableRaf/HicEtNunc-p5js-templates

// hicetnunc code is adapted from https://github.com/hicetnunc2000/hicetnunc/tree/main/templates/html-p5js-template
// More hicetnunc html templates (three.js, glsl, etc) can be found at
// https://github.com/hicetnunc2000/hicetnunc/tree/main/templates

// 🤓 Note: replace thumbnail.png with your own thumbnail

// **************************
// *    HIC ET NUNC DATA    *
// **************************

// If you want to create OBJKT's with different seeds,
// you can access the creator and viewer wallet ids.
// This values will only be injected once the piece has been minted
// they will not work locally.
const creator = new URLSearchParams(window.location.search).get("creator");
const viewer = new URLSearchParams(window.location.search).get("viewer");
// NOTE: if the user is viewing the page on hicetnunc while unsynced,
// the viewer variable will return a string of value "false" (NOT a boolean)

// The ID of the OBJKT is also passed via the URL parameters
const objkt = new URLSearchParams(window.location.search).get("objkt");
// NOTE: when the object is viewed in the preview page
// the objkt variable will return a string of value "false" (NOT a boolean)

console.log("NFT created by", creator); // null if local
console.log("NFT viewed by", viewer); // null if local
console.log("OBJKT ID", objkt); // null if local

const DEFAULTSEED = 123456789;
let viewerSeed = DEFAULTSEED;

const DUMMY = "tz1hfuVWgcJ89ZE75ut9Qroi3y7GFJL5Lf2K"; // simulate a synced viewer (user a different address to try another viewer)
const UNSYNCED = "false"; // simulate an unsynced user

const PREVIEW_OBJKT = "false"; // simulate the preview page
const DUMMY_OBJKT = 67954; // simulate an OBJKT ID

// Default is viewer. Try with DUMMY or UNSYNCED only for debugging
let viewerData = viewer;
// let viewerData = UNSYNCED;
// let viewerData = DUMMY;

// Default is creator. Try with DUMMY only for debugging
let creatorData = creator;
//let creatorData = DUMMY;

// Default is objkt. Try with DUMMY_OBJKT or PREVIEW_OBJKT only for debugging
let objktData = objkt;
//let objktData = DUMMY_OBJKT;
// let objktData = PREVIEW_OBJKT;

// Check if we have a viewer
let viewerWasFound = viewerData && !viewerData.includes("false");

// **************************
// *    GLOBAL VARIABLES    *
// **************************

let colorHue;

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

  // Use the same random and noise values every time for a given (synced) viewer
  noiseSeed(viewerSeed);
  randomSeed(viewerSeed); // NOTE: Math.random() is not affected by randomSeed()

  createCanvas(windowWidth, windowHeight);

  noStroke();

  background(0);

  colorHue = random(360);
}

// **************************
// *          DRAW          *
// **************************

function draw() {
  let scale = min(width, height);

  let angle = (frameCount * 0.12) / TWO_PI;

  // Calculate the size of the brush
  noiseDetail(4, 0.5);
  let noiseX = cos(angle) + 1;
  let noiseY = sin(angle) + 1;
  let n = noise(noiseX, noiseY);
  let s = scale * 0.1 * n;

  // Calculate the position of the brush
  noiseDetail(2, 0.1);
  n = noise(noiseX, noiseY);
  let r = 0.33 * scale - n * 200;
  let x = cos(angle) * r;
  let y = sin(angle) * r;

  // Draw the brush
  push();
  noStroke();
  translate(width / 2, height / 2);
  colorMode(HSB);
  fill(colorHue, 70, 80);
  circle(x, y, s);
  pop();

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
  text(`OBJKT ID: ${objkt}`, txtSize, txtSize * 5);
  pop();

  // Create a screen reader accessible description for the canvas
  describe(
    `A roughly circular colorful ribbon in the center of a black canvas. Text in the top left reads:` +
      `\n NFT created by: ${creator}` +
      `\n NFT viewed by: ${viewerData}` +
      `\n Seed: ${viewerSeed} ${suffix}` +
      `\n OBJKT ID: ${objkt}`
  );
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
