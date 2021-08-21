// HICDEX API TEMPLATE

// 🚨 this template uses an external API (Hicdex)
// If Hicdex changes its API or stops functioning
// already minted OBJKTs may be permanently broken

// p5.js template for minting on Hic et Nunc
// Made for Processing's 20th anniversary Fundraiser
// By Raphaël de Courville (@sableraph)
// Find the latest version at https://github.com/SableRaf/HicEtNunc-p5js-templates

// hicetnunc code is adapted from https://github.com/hicetnunc2000/hicetnunc/tree/main/templates/html-p5js-template
// More hicetnunc html templates (three.js, glsl, etc) can be found at
// https://github.com/hicetnunc2000/hicetnunc/tree/main/templates

// 🤓 Note: replace thumbnail.png with your own thumbnail

// **************************
// *        COLORS          *
// **************************

const paletteArray = [
  "https://coolors.co/ffadad-ffd6a5-fdffb6-caffbf-9bf6ff-a0c4ff-bdb2ff-ffc6ff",
  "https://coolors.co/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529",
];

let colors = [];

function getColorsFrom(palArray, index) {
  if (index > palArray.length) {
    console.error(
      `You are trying to get color palette at index ${index} but the color palette array is only of length ${colorArray.length}`
    );
    return;
  }
  let paletteUrl = palArray[index];
  console.log("🎨 color palette: " + paletteUrl);
  let colorArray = paletteUrl.match(/[0-9a-f]{6}/g).map((c) => color(`#${c}`));
  return colorArray;
}

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
console.log("OBJKT ID is", objkt); // null if local

const DEFAULTSEED = 123456789;
let viewerSeed = DEFAULTSEED;

const DUMMY = "tz1hfuVWgcJ89ZE75ut9Qroi3y7GFJL5Lf2K"; // simulate a synced viewer (user a different address to try another viewer)
const UNSYNCED = "false"; // simulate an unsynced user

const PREVIEW_OBJKT = "false"; // simulate the preview page
const DUMMY_OBJKT = 67954; // simulate an OBJKT ID

// Default is viewer. Try with DUMMY or UNSYNCED only for debugging
//let viewerData = viewer;
//let viewerData = UNSYNCED;
let viewerData = DUMMY;

// Default is creator. Try with DUMMY only for debugging
let creatorData = creator;
//let creatorData = DUMMY;

// Default is objkt. Try with DUMMY_OBJKT or PREVIEW_OBJKT only for debugging
//let objktID = objkt; // will cause errors when ran locally (objkt is null)
let objktID = DUMMY_OBJKT;
//let objktID = PREVIEW_OBJKT;

// Check if we have a viewer
let viewerWasFound = viewerData && !viewerData.includes("false");

// **************************
// *       PARAMETERS       *
// **************************

// Set this to true when minting
p5.disableFriendlyErrors = false;

// The title of your piece goes here (not visible on hicetnunc)
document.title = "My beautiful p5.js sketch";

// Describe what your piece looks like to screen reader users
let description = "";

let txtSize = 32;

// **************************
// *    GLOBAL VARIABLES    *
// **************************

let objktMetadata = {};

let owners = [];

let viewerIsOwner = false; // we will set this based on the hicdex query

let isPreview = objktID === "false";

let dataFinishedLoading = false;

// **************************
// *        PRELOAD         *
// **************************

function preload() {
  if (!isPreview) {
    fetchData(objktID)
      .then((data) => checkViewerIsOwner(data))
      .then(() => {
        colors = getColors(viewerIsOwner);
      })
      .then(() => {
        dataFinishedLoading = true;
      });
  } else {
    console.warn(
      "This sketch doesn't have an OBJKT ID yet (preview mode?). Unable to fetch data"
    );
  }
}

// **************************
// *          SETUP         *
// **************************

function setup() {
  createCanvas(windowWidth, windowHeight);

  describe(description); // Create a screen reader accessible description for the canvas

  push();
  stroke(0);
  strokeWeight(8);
  strokeJoin(ROUND);
  fill(255);
  textSize(txtSize);

  if (isPreview) {
    console.log("Preview mode");
  }
}

// **************************
// *          DRAW          *
// **************************

function draw() {
  background(255);
  fill(255);
  stroke(0);

  text(`OBJKT #${objktID}`, txtSize, height - txtSize);

  if (dataFinishedLoading) {
    if (viewerIsOwner === true) {
      showOwnerArt();
    } else {
      showDefaultArt();
    }
  }
}

// We do this if the viewer owns the OBJKT
function showOwnerArt() {
  text(`You own this NFT`, txtSize, txtSize * 2);
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < 20; i++) {
    let c = colors[(i + floor(frameCount * 0.1)) % colors.length];
    //if (frameCount > 5 && frameCount < 10) console.log(c);
    //blendMode(DIFFERENCE);
    noFill();
    stroke(c);
    circle(0, 0, i * 30);
    blendMode(BLEND);
  }
  pop();
}

// We do that if the viewer does NOT own the OBJKT
function showDefaultArt() {
  text(`You do not own this NFT`, txtSize, txtSize * 2);
  push();
  noFill();
  translate(width / 2, height / 2);
  for (let i = 0; i < 20; i++) {
    let c = colors[(i + floor(frameCount * 0.1)) % colors.length];
    //if (frameCount > 5 && frameCount < 10) console.log(c);
    stroke(c);
    let diameter = i * 30;
    circle(0, 0, diameter);
  }
  pop();
}

function getColors(isColor) {
    if (isColor) {
      return getColorsFrom(paletteArray, 0);
    } else {
      return getColorsFrom(paletteArray, 1);
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// **************************
// *      HICDEX API        *
// **************************

function checkViewerIsOwner(data) {
  if (data.token_holders.some((e) => e.holder.address === viewerData)) {
    console.log(`The viewer owns this OBJKT`);
    viewerIsOwner = true;
  } else {
    console.log(`The viewer does NOT own this OBJKT`);
  }
  console.log({ OBJKT: data });
}

// http://hicdex.com/objkt?objkt=149371

const query = `
  query Objkt($id: bigint!) {
    hic_et_nunc_token_by_pk(id: $id) {
      artifact_uri
      creator {
        address
        name
      }
      description
      display_uri
      id
      level
      mime
      royalties
      supply
      thumbnail_uri
      metadata
      timestamp
      title
      token_tags(order_by: {id: asc}) {
        tag {
          tag
        }
      }
      swaps(order_by: {id: asc}) {
        price
        timestamp
        status
        amount
        amount_left
        creator {
          address
          name
        }
      }
      trades(order_by: {timestamp: asc}) {
        amount
        buyer {
          address
          name
        }
        seller {
          address
          name
        }
        swap {
          price
        }
        timestamp
      }
      token_holders(where: {quantity: {_gt: "0"}}, order_by: {id: asc}) {
        quantity
        holder {
          address
          name
        }
      }
      hdao_balance
      extra
    }
  }
`;

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch("https://api.hicdex.com/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

async function fetchData(objktId) {
  const { errors, data } = await fetchGraphQL(query, "Objkt", { id: objktId });
  if (errors) {
    console.error(errors);
  }
  const result = data.hic_et_nunc_token_by_pk;
  //console.log({ result });
  return result;
}
