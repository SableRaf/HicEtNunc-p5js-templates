// HICDEX API TEMPLATE

// p5.js template for minting on Hic et Nunc
// Made for Processing's 20th anniversary Fundraiser
// By Raphaël de Courville (@sableraph)
// Find the latest version at https://github.com/SableRaf/HicEtNunc-p5js-templates

// hicetnunc code is adapted from https://github.com/hicetnunc2000/hicetnunc/tree/main/templates/html-p5js-template
// More hicetnunc html templates (three.js, glsl, etc) can be found at
// https://github.com/hicetnunc2000/hicetnunc/tree/main/templates

// 🤓 Note: replace thumbnail.png with your own thumbnail

// 🛸 Note 2: this template uses an external API
// it could break in the future with no chance to fix it

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
//let viewerData = viewer;
//let viewerData = UNSYNCED;
let viewerData = DUMMY;

// Default is creator. Try with DUMMY only for debugging
let creatorData = creator;
//let creatorData = DUMMY;

// Default is objkt. Try with DUMMY_OBJKT or PREVIEW_OBJKT only for debugging
//let objktID = objkt;
let objktID = DUMMY_OBJKT;
// let objktID = PREVIEW_OBJKT;

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

// **************************
// *    GLOBAL VARIABLES    *
// **************************

let objktMetadata = {};

let owners = [];

let viewerIsOwner = "false"; // we will set this based on the hicdex query

// **************************
// *        PRELOAD         *
// **************************

function preload() {}

// **************************
// *          SETUP         *
// **************************

function setup() {
  createCanvas(windowWidth, windowHeight);
  describe(description); // Create a screen reader accessible description for the canvas
}

// **************************
// *          DRAW          *
// **************************

function checkViewerIsOwner(data) {
  if (data.token_holders.some((e) => e.holder.address === viewerData)) {
    console.log("found owner");
    viewerIsOwner = true;
  }
  console.log({ OBJKT: data });
}

function draw() {
  background(255);

  if (frameCount === 1) {
    fetchData(objktID).then((data) => checkViewerIsOwner(data));
  }

  let txtSize = 32;
  push();
  stroke(0);
  strokeWeight(8);
  strokeJoin(ROUND);
  fill(255);
  textSize(txtSize);
  if (viewerIsOwner === true) {
    text(
      `😎` + `\nYou own this NFT ` + `\n(OBJKT #${objktID})`,
      txtSize,
      txtSize * 2
    );
  } else {
    text(
      `🙁` + `\nYou do not own this NFT` + `\n(OBJKT #${objktID})`,
      txtSize,
      txtSize * 2
    );
  }
  pop();
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
// *    HICDEX API QUERY    *
// **************************

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
