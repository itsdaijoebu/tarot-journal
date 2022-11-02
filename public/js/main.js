/**************
 *TABLE OF CONTENTS
 * Initialization Function(s)
 * Card Prep Functions
 * Card Retrieval Functions
 * Card Interaction Functions
 * Tarot Reading Functions
 * INTERPRETATION FORM FUNCTIONS
 * UTILITY FUNCTIONS
 ***************/

// query selectors
const deckImage = document.getElementById("deck-image");
const deckContainer = document.getElementById('deck-container')
const spreadPositionPast = document.getElementById("spread-position-past");
const spreadPositionPresent = document.getElementById("spread-position-present");
const spreadPositionFuture = document.getElementById("spread-position-future");

const cardbackSelect = document.getElementById("cardback-select");
const cardfaceSelect = document.getElementById("cardface-select");
const spreadSelect = document.getElementById('spread-select')

const slotDescriptionText = document.getElementById('slot-description-text');
const slotTitle = document.getElementById('slot-title')

const cardNumber = document.getElementById('card-number')
const cardSuit = document.getElementById('card-suit')
const upKeywords = document.getElementById('up-keywords')
const upDescription = document.getElementById('up-description')
const saysReversed = document.getElementById('saysReversed')
const revKeywords = document.getElementById('rev-keywords')
const revDescription = document.getElementById('rev-description')

const interpretationMin = document.getElementById('interpretation-minimize')
const interpretationWindowHeader = document.getElementById('interpretation-window-header')
const interpretationWindow = document.getElementById('interpretation-window')
const interpretationBody = document.getElementById('interpretation-body')
const pastInterpretationCard = document.getElementById('pastInterpretationCard')
const presentInterpretationCard = document.getElementById('presentInterpretationCard')
const futureInterpretationCard = document.getElementById('futureInterpretationCard')
const pastInterpretationCardId = document.getElementById('pastInterpretationCardId')
const presentInterpretationCardId = document.getElementById('presentInterpretationCardId')
const futureInterpretationCardId = document.getElementById('futureInterpretationCardId')

const querentQuestion = document.getElementById('querent-question')

// get bounding rects to calculate collisions with cards so that which slot the card is in can be calculated
// let spreadPositionPastBox = spreadPositionPast.getBoundingClientRect();
// let spreadPositionPresentBox = spreadPositionPresent.getBoundingClientRect();
// let spreadPositionFutureBox = spreadPositionFuture.getBoundingClientRect();
let spreadPositionsArray = [spreadPositionPast, spreadPositionPresent, spreadPositionFuture]
// spreadPositions.set(spreadPositionPast, spreadPositionPastBox)
// spreadPositions.set(spreadPositionPresent, spreadPositionPresentBox)
// spreadPositions.set(spreadPositionFuture, spreadPositionFutureBox)

// event listeners
deckImage.addEventListener('mousedown', drawCard)

spreadPositionPast.addEventListener('click', slotMeaningOnClick)
spreadPositionPresent.addEventListener('click', slotMeaningOnClick)
spreadPositionFuture.addEventListener('click', slotMeaningOnClick)

interpretationMin.addEventListener('click', toggleInterpretation)
interpretationWindowHeader.addEventListener('dblclick', toggleInterpretation)
querentQuestion.addEventListener('click', maximizeInterpretation)


// window.addEventListener('resize', recalcBoundingBoxes)

// card variables
let cards;
let cardbacks;
let selectedCardback;
let cardfaces;
let cardCollections;
let selectedCardCollection;
let selectedCardFaces;
let spreads;
let selectedSpread;
let deck = [];

//initialization
start();

/******************************************
 * Initialization Function(s)
 *******************************************/
async function start() {
  await getSpreads();
  await getCards();
  await getCardCollections();
  await getCardbacks();
  await getCardfaces();
  shuffle(deck);
  populateSelect(cardbackSelect, cardbacks, "name"); // populate select options for cardbacks
  populateSelect(cardfaceSelect, cardCollections, "name"); // populate select options for card faces
  populateSelect(spreadSelect, spreads, "name") // populate select options for spreads
  let cardback = cardbacks.find(cb => cb.name=='Rider-Waite') // set default as Rider-Waite
  setCardbacks(cardback._id);
  dragElement(interpretationWindow);
}

/******************************************
 * Card Prep Functions
 *******************************************/
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

/******************************************
 * Card Retrieval Functions
 *******************************************/
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
  const data = await res.json();
  cardbacks = data.cards;
  console.log("cardbacks: ", cardbacks);
}
async function getCardfaces() {
  const res = await fetch("/api/getCardfaces");
  const data = await res.json();
  cardfaces = data.cards;
  console.log("cardfaces: ", cardfaces);
  selectedCardFaces = cardfaces.filter(cardface => cardface.cardCollection === selectedCardCollection)
  console.log('selected card faces: ', selectedCardFaces)
}
async function getCardCollections() {
  const res = await fetch("/api/getCardCollections");
  const data = await res.json();
  cardCollections = data.cards;
  console.log("card collections: ", cardCollections);
  selectedCardCollection = cardCollections[0].name
  console.log('selected card collection: ', selectedCardCollection)
}
async function getSpreads() {
  const res = await fetch("/api/getSpreads");
  const data = await res.json();
  spreads = data.cards;
  console.log('spreads: ', spreads);
  selectedSpread = spreads[0];
}

/******************************************
 * Card Interaction Functions
 *******************************************/
function dragElement(elmnt) {
  console.log('elmnt', elmnt)
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    elmnt.classList.add('active')


    //reset card's spread position
    elmnt.dataset.spreadPosition = ''

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    // move element to sit on top of everything else
    if (!elmnt.classList.contains('interpretation-window')) {
      elmnt.parentNode.appendChild(elmnt)
    }

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
    // elmnt.classList.add('prevent-pointer')

  }
  function closeDragElement() {
    // if card collides with a spread position by over a certain percentage (initially 60%) when dropped,
    // then that card is counted as in that position
    if (elmnt.classList.contains("tarot-container")) {
      spreadPositionsArray.forEach(box => checkCollision(elmnt, box))  // REFACTOR later to just use a for loop since if card is found to be in a spread position, no need to check the rest
    }
    
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    // elmnt.classList.remove('prevent-pointer')
    elmnt.classList.remove('active')
  }
}


/******************************************
 * Tarot Reading Functions
 *******************************************/
function drawCard() {
  console.log('draw card')
  if (deck.length < 2) {
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
  card.dataset.cardName = `${selectedCard.number} ${selectedCard.suit}`;
  card.id = selectedCard._id;


  const cardface = document.createElement('div')
  cardface.classList.add('doublesided-front')
  const cardfaceImg = document.createElement('img')
  cardfaceImg.src = selectedCardFaces.find(cardFace => cardFace.cardId === selectedCard._id).image
  cardfaceImg.alt = 'face'
  cardface.appendChild(cardfaceImg)
  cardInner.appendChild(cardface)

  card.onmouseup = getCardInfo

  function getCardInfo() {
    cardInner.classList.add('doublesided-flipped')

    console.log('click');
    cardNumber.innerText = selectedCard.number.romanize();
    cardSuit.innerText = selectedCard.suit;
    upKeywords.innerText = selectedCard.upKeywords;
    upDescription.innerText = selectedCard.upDescription;
    saysReversed.classList.remove('hidden'); // otherwise the words 'reversed' will appear interpretation window before there's any content
    revKeywords.innerText = selectedCard.revKeywords;
    revDescription.innerText = selectedCard.revDescription;
  }
}

//REFACTOR to use spread position instead of name, and try to consolidate these two methods into a single one
function slotMeaningOnClick(e) {
  console.log('spread: ', selectedSpread)
  let positionName = e.target.dataset.spreadPosition;
  slotTitle.innerText = positionName;
  slotDescriptionText.innerText = selectedSpread.positions.find(position => position.name.toLowerCase() === positionName.toLowerCase()).meaning;
}
function slotMeaningOnCard(positionName) {
  console.log('position name', positionName);
  slotTitle.innerText = positionName;
  slotDescriptionText.innerText = selectedSpread.positions.find(position => position.name.toLowerCase() === positionName.toLowerCase()).meaning;
}

/***************************************
 * INTERPRETATION FORM FUNCTIONS
 ***************************************/
function validateInterpretation() {
  const cardIdFields = document.querySelectorAll('.interpretation-card-id')
  for(let i = 0; i < cardIdFields.length; i++) {
    if(!cardIdFields[i].value) {
      alert("Please put a card in each of the slots for this spread.")
      return false
    }
  }
}

function toggleInterpretation() {
  interpretationBody.classList.toggle('hidden')
}
function maximizeInterpretation() {
  interpretationBody.classList.remove('hidden')
}



/***************************************
 * UTILITY FUNCTIONS
 ***************************************/
Number.prototype.romanize = function () {
  // console.log(this)
  if (isNaN(this))
    return NaN;
  if (this == 0)
    return 0
  var digits = String(+this).split(""),
    key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
      "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
      "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    roman = "",
    i = 3;
  while (i--)
    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

// collision detection
function recalcBoundingBoxes() {
  spreadPositionPastBox = spreadPositionPast.getBoundingClientRect();
  spreadPositionPresentBox = spreadPositionPresent.getBoundingClientRect();
  spreadPositionFutureBox = spreadPositionFuture.getBoundingClientRect();

  spreadPositions.set(spreadPositionPast, spreadPositionPastBox)
  spreadPositions.set(spreadPositionPresent, spreadPositionPresentBox)
  spreadPositions.set(spreadPositionFuture, spreadPositionFutureBox)
  console.log('spread positions: ', spreadPositions)
}
const calculateCollisionLength = (point1, point2, length1, length2) => {
  const pointb1 = point1 + length1;
  const pointb2 = point2 + length2;
  const diff1 = Math.abs(point1 - point2);
  const diff2 = Math.abs(pointb1 - pointb2);
  return (length1 + length2 - diff1 - diff2) / 2;
}
function checkCollision(card, spreadPosition) {
  let spreadPositionBox = spreadPosition.getBoundingClientRect();
  const cardBox = card.getBoundingClientRect();
  console.log('rects: ', cardBox, spreadPositionBox)
  if (cardBox.x < spreadPositionBox.x + spreadPositionBox.width &&
    cardBox.x + cardBox.width > spreadPositionBox.x &&
    cardBox.y < spreadPositionBox.y + spreadPositionBox.height &&
    cardBox.height + cardBox.y > spreadPositionBox.y) {
    console.log("collision detected!")

    const collision = { xLength: 0, yLength: 0 };

    collision.xLength = calculateCollisionLength(cardBox.x, spreadPositionBox.x, cardBox.width, spreadPositionBox.width);
    collision.yLength = calculateCollisionLength(cardBox.y, spreadPositionBox.y, cardBox.height, spreadPositionBox.height);
    console.log('collisions: ', collision.xLength, collision.yLength, collision.xLength * collision.yLength)
    console.log('card size: :', cardBox.width * cardBox.height, cardBox.width * cardBox.height * 0.55)

    if (collision.xLength * collision.yLength > (cardBox.width * cardBox.height * 0.55)) {
      console.log('position: ', spreadPosition.dataset.spreadPosition)
      spreadPositionName = spreadPosition.dataset.spreadPosition;
      card.dataset.spreadPosition = spreadPositionName;
      slotMeaningOnCard(spreadPositionName)
      console.log("card",card)
      console.log('cardId', card.id)
      if(spreadPositionName.toLowerCase() === 'past') {
        pastInterpretationCard.innerText = card.dataset.cardName;
        pastInterpretationCardId.value = card.id;
      } else if(spreadPositionName.toLowerCase() === 'present') {
        presentInterpretationCard.innerText = card.dataset.cardName;
        presentInterpretationCardId.value = card.id;
      } else if (spreadPositionName.toLowerCase() === 'future') {
        futureInterpretationCard.innerText = card.dataset.cardName;
        futureInterpretationCardId.value = card.id;
      } 
    }
  }
  else return null;
}

/******************
 * DEV FUNCTIONS
******************/
document.querySelectorAll('.click').forEach(e => e.addEventListener('click', () => console.log('clicked on an element')))