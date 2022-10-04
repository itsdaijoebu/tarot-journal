// query selectors
const deckImage = document.querySelector("#deck-image");
const deckContainer = document.querySelector('#deck-container')
const readingPast = document.querySelector("#reading-past");
const readingPresent = document.querySelector("#reading-present");
const readingFuture = document.querySelector("#reading-future");

const cardbackSelect = document.querySelector("#cardback-select");
const cardfaceSelect = document.querySelector("#cardface-select");

// event listeners
deckImage.addEventListener('mousedown', drawCard)

// card variables
let cards;
let cardbacks;
let selectedCardback;
let cardfaces;
let cardCollections;
let selectedCardCollection;
let selectedCardFaces;
let deck = [];

//initialization
start();



//initialization functions
async function start() {
  await getCards();
  await getCardCollections();
  await getCardbacks();
  await getCardfaces();
  shuffle(deck);
  populateSelect(cardbackSelect, cardbacks, "name"); // populate select options for cardbacks
  populateSelect(cardfaceSelect, cardCollections, "name"); // populate select options for card faces
  setCardbacks(cardbacks[0]._id);
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
function setCardbacks(cardbackId) {
  selectedCardback = cardbacks.find(
    (cardback) => cardback._id === cardbackId
  ).image;
  deckImage.src = selectedCardback;
}

// card retrieval functions
async function getCards() {
  const res = await fetch("/api/getCards");
  const cardJson = await res.json();
  cards = cardJson.cards;
  console.log("cards: ", cards);
  for (let card of cards) {
    deck.push(card);
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
  selectedCardFaces = cardfaces.filter(cardface => cardface.cardCollection === selectedCardCollection)
  console.log('selected card faces: ', selectedCardFaces)
}
async function getCardCollections() {
  const res = await fetch("/api/getCardCollections");
  const cardCollectionJson = await res.json();
  cardCollections = cardCollectionJson.cards;
  console.log("card collections: ", cardCollections);
  selectedCardCollection = cardCollections[0].name
  console.log('selected card collection: ', selectedCardCollection)
}

// card interaction functions
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // move element to sit on top of everything else
    elmnt.parentNode.appendChild(elmnt)


    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// tarot reading functions
function drawCard(e) {
  console.log('draw card')
  if(deck.length < 2) {
    deckImage.classList.add('empty-deck')
    deckImage.removeEventListener('mousedown', drawCard)
  }
  const card = document.createElement('article')
  card.classList.add('draggable', 'tarot-container', 'doublesided')
  deckContainer.appendChild(card)
  dragElement(card)
  card.dispatchEvent(new Event('mousedown'))

  // element that holds the transform for the front and back of the card
  const cardInner = document.createElement('div')
  cardInner.classList.add('doublesided-inner')
  card.appendChild(cardInner)
  
  const cardback = document.createElement('div')
  cardback.classList.add('doublesided-back')
  const cardbackImg = document.createElement('img')
  cardbackImg.src = selectedCardback
  cardbackImg.alt = 'back'
  cardback.appendChild(cardbackImg)
  cardInner.appendChild(cardback)

  // get the next card in the deck
  const selectedCard = deck.shift();
  console.log('selected card: ', selectedCard)


  const cardface = document.createElement('div')
  cardface.classList.add('doublesided-front')
  const cardfaceImg = document.createElement('img')
  cardfaceImg.src = selectedCardFaces.find(cardFace => cardFace.cardId === selectedCard._id).image
  cardfaceImg.alt = 'face'
  cardface.appendChild(cardfaceImg)
  cardInner.appendChild(cardface)

  cardInner.onmouseup = flipCard

  function flipCard() {
    cardInner.classList.add('doublesided-flipped')
  }
}

