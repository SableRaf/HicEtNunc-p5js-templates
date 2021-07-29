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
