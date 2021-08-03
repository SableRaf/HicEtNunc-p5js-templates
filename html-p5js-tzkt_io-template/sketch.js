// BASIC TEMPLATE

// p5.js template for minting on Hic et Nunc
// Made for Processing's 20th anniversary Fundraiser
// By Raphaël de Courville (@sableraph)

// hicetnunc code is adapted from https://github.com/hicetnunc2000/hicetnunc/tree/main/templates/html-p5js-template
// More hicetnunc html templates (three.js, glsl, etc) can be found at
// https://github.com/hicetnunc2000/hicetnunc/tree/main/templates

// **************************
// *        TZKT.IO         *
// **************************

let walletAddr = "tz1hfuVWgcJ89ZE75ut9Qroi3y7GFJL5Lf2K";

//https://api.tzkt.io/

//https://api.tzkt.io/#section/C-simple-client
let tzktURL = "https://api.tzkt.io/v1/events";

const connection = new signalR.HubConnectionBuilder().withUrl(tzktURL).build();

async function init() {
  // open connection
  await connection.start();
  // subscribe to head
  await connection.invoke("SubscribeToHead");
  // subscribe to account transactions
  await connection.invoke("SubscribeToOperations", {
    address: walletAddr,
    types: "transaction",
  });
}

// auto-reconnect
connection.onclose(init);

connection.on("head", (msg) => {
  console.log(msg);
});

connection.on("operations", (msg) => {
  console.log(msg);
});

init();

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

function preload() {}

// **************************
// *          SETUP         *
// **************************

function setup() {
  noCanvas();
}

// **************************
// *          DRAW          *
// **************************

function draw() {
  //background(0);
  //translate(width / 2, height / 2);
  //circle(0, 0, sin(frameCount * 0.01) * min(width, height));
}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
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
