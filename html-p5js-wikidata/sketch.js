// WIKIDATA TEMPLATE

// NOTE: this is only a very minimal example that doesn't offer much flexibility

// p5.js template for minting on Hic et Nunc
// Made for Processing's 20th anniversary Fundraiser
// By Raphaël de Courville (@sableraph)

// hicetnunc code is adapted from https://github.com/hicetnunc2000/hicetnunc/tree/main/templates/html-p5js-template
// More hicetnunc html templates (three.js, glsl, etc) can be found at
// https://github.com/hicetnunc2000/hicetnunc/tree/main/templates

// **************************
// *        WIKIDATA        *
// **************************

// https://editor.p5js.org/piecesofuk/sketches/SJpC47Dgf
let json;
let wikidataURL =
  "https://query.wikidata.org/sparql?format=json&query=%23Cats%0ASELECT%20%3Fitem%20%3FitemLabel%20%0AWHERE%20%0A%7B%0A%20%20%3Fitem%20wdt%3AP31%20wd%3AQ146.%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%0A%7D%20LIMIT%202";

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

// **************************
// *        PRELOAD         *
// **************************

function preload() {
  json = loadJSON(wikidataURL);
}

// **************************
// *          SETUP         *
// **************************

function setup() {
  noCanvas();

  console.log(json);

  let bindings = json.results.bindings;

  for (let i = 0; i < bindings.length; i++) {
    console.log(bindings[i]["itemLabel"]["value"]);
  }
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
