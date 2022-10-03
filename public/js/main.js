const deckImage = document.querySelector("#deck-facedown");
const readingPast = document.querySelector("#reading-past");
const readingPresent = document.querySelector("#reading-present");
const readingFuture = document.querySelector("#reading-future");

const cardbackSelect = document.querySelector("#cardback-select");
const cardfaceSelect = document.querySelector("#cardface-select");

// card variables
let cards;
let cardbacks;
let cardfaces;
let cardCollections;
let deck = [];

//initialization
start();

//initialization functions
async function start() {
  await getCards();
  await getCardbacks();
  await getCardfaces();
  await getCardCollections();
  shuffle(deck);
  populateSelect(cardbackSelect, cardbacks, "name");    // populate select options for cardbacks
  populateSelect(cardfaceSelect, cardCollections, "name");  // populate select options for card faces
  setCardbacks();
}

// card prep functions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function populateSelect(select, options, property) {
  options.forEach((o) => {
    let element = document.createElement("option");
    let name = o[property];
    element.value = name;
    element.textContent = name;
    select.appendChild(element);
  });
}
function setCardbacks(cardback) {
    
}

// card retrieval functions
async function getCards() {
  const res = await fetch("/api/getCards");
  const cardJson = await res.json();
  cards = cardJson.cards;
  console.log("cards: ", cards);
  for (let card of cards) {
    deck.push(card._id);
  }
  console.log("deck: ", deck);
}
async function getCardbacks() {
  const res = await fetch("/api/getCardbacks");
  const cardbackJson = await res.json();
  cardbacks = cardbackJson.cards;
  console.log("cardbacks: ", cardbacks);
}
async function getCardfaces() {
  const res = await fetch("/api/getCardfaces");
  const cardfaceJson = await res.json();
  cardfaces = cardfaceJson.cards;
  console.log("cardfaces: ", cardfaces);
}
async function getCardCollections() {
  const res = await fetch("/api/getCardCollections");
  const cardCollectionJson = await res.json();
  cardCollections = cardCollectionJson.cards;
  console.log("card collections: ", cardCollections);
}
