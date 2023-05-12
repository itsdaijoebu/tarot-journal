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
const shuffleBtn = document.getElementById('shuffle-btn')
const deckImage = document.getElementById("deck-image");
const deckContainer = document.getElementById('deck-container')
const spreadPositionPast = document.getElementById("spread-position-past");
const spreadPositionPresent = document.getElementById("spread-position-present");
const spreadPositionFuture = document.getElementById("spread-position-future");

const cardbackSelect = document.getElementById("cardback-select");
const cardfaceSelect = document.getElementById("cardface-select");
const spreadSelect = document.getElementById('spread-select')

const slotDescription = document.getElementById('slot-description');
const slotDescriptionText = document.getElementById('slot-description-text');
const slotTitle = document.getElementById('slot-title');

const cardDescription = document.getElementById('card-description')
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

const querentQuestion = document.getElementById('querent-question')

const pastInterpretationCard = document.getElementById('pastInterpretationCard')
const presentInterpretationCard = document.getElementById('presentInterpretationCard')
const futureInterpretationCard = document.getElementById('futureInterpretationCard')
const pastInterpretationCardId = document.getElementById('pastInterpretationCardId')
const presentInterpretationCardId = document.getElementById('presentInterpretationCardId')
const futureInterpretationCardId = document.getElementById('futureInterpretationCardId')

// get bounding rects to calculate collisions with cards so that which slot the card is in can be calculated
// let spreadPositionPastBox = spreadPositionPast.getBoundingClientRect();
// let spreadPositionPresentBox = spreadPositionPresent.getBoundingClientRect();
// let spreadPositionFutureBox = spreadPositionFuture.getBoundingClientRect();
let spreadPositionsArray = [spreadPositionPast, spreadPositionPresent, spreadPositionFuture]
// spreadPositions.set(spreadPositionPast, spreadPositionPastBox)
// spreadPositions.set(spreadPositionPresent, spreadPositionPresentBox)
// spreadPositions.set(spreadPositionFuture, spreadPositionFutureBox)

// reversal variables
let reversedChance = 0.3;

// event listeners

spreadPositionPast.addEventListener('click', slotMeaningOnClick)
spreadPositionPresent.addEventListener('click', slotMeaningOnClick)
spreadPositionFuture.addEventListener('click', slotMeaningOnClick)

interpretationMin.addEventListener('click', toggleInterpretation)
interpretationWindowHeader.addEventListener('dblclick', toggleInterpretation)
querentQuestion.addEventListener('click', maximizeInterpretation)

interpretationWindow.addEventListener('submit', checkInterpretation)

// shuffleBtn.addEventListener('click', resetShuffle)

// window.addEventListener('resize', getWindowSize)

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
  await checkForSavedReadings();
  await getSpreads();
  await getCardbacks();
  await getCards();
  await getCardCollections();
  await getCardfaces();
  shuffle(deck);
  deck[0].isReversed ? deckImage.classList.add('reversed') : deckImage.classList.remove('reversed') //reverses deckimage if first card is reversed since this is otherwise set after a card is drawn
  let cardback = cardbacks.find(cb => cb.name == 'Rider-Waite') // set default as Rider-Waite
  setCardbacks(cardback._id);
  populateSelect(cardbackSelect, cardbacks, "name"); // populate select options for cardbacks
  populateSelect(cardfaceSelect, cardCollections, "name"); // populate select options for card faces
  populateSelect(spreadSelect, spreads, "name") // populate select options for spreads
  setCardbackSelectValue(cardback._id);
  dragElement(interpretationWindow);
  doneLoading();
}

async function checkForSavedReadings() {
  if (interpretationWindow.dataset.username) {
    let savedReading = sessionStorage.getItem('savedTarotReading')
    if (savedReading) {
      const response = await fetch('dashboard/save-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: savedReading,
      })
      sessionStorage.removeItem('savedTarotReading')
      if (response.redirected) {
        window.location.href = response.url;
      }
      console.log('still here')
    }
  }
}

function doneLoading() {
  deckImage.addEventListener('mousedown', drawCard)
}

/******************************************
 * Card Prep Functions
 *******************************************/
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    if (Math.random() < reversedChance) {  // reverses the card if under a certain percentage
      array[i].isReversed = true; // reminder to future me: the deck is an array, but each card is an object
    }
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// select = chosen 'select' element on the html page to populate, ex. cardbackSelect => the select element in the html for selecting cardbacks
// options = array of objects with which to populate the select element, ex. cardbacks => an array holding all the cardbacks from the database
// property = name of the property to use to populate the select, ex. name => use the names of the cardbacks in the cardbacks array to populate the select element
function populateSelect(select, options, property) {
  options.forEach((option) => {
    let element = document.createElement("option");
    element.value = option._id;
    element.textContent = option[property];;
    select.appendChild(element);
  });
}

/*******************************************
 * Set card images and defaults
 ******************************************/
function setCardbacks(cardbackId) {
  selectedCardback = cardbacks.find(
    (cardback) => cardback._id === cardbackId
  ).image;
  deckImage.src = selectedCardback;
}
function setCardbackSelectValue(cardbackId) {
  cardbackSelect.value = cardbackId
}

/******************************************
 * Card Retrieval Functions
 *******************************************/
async function getCards() {
  const res = await fetch("/api/getCards");
  const cardJson = await res.json();
  cards = cardJson.cards;
  console.log('cards: ', cards)
  for (let card of cards) {
    deck.push(card);
  }
}
async function getCardbacks() {
  const res = await fetch("/api/getCardbacks");
  const data = await res.json();
  cardbacks = data.cards;
}
async function getCardfaces() {
  const res = await fetch("/api/getCardfaces");
  const data = await res.json();
  cardfaces = data.cards;
  selectedCardFaces = cardfaces.filter(cardface => cardface.cardCollection === selectedCardCollection)
}
async function getCardCollections() {
  const res = await fetch("/api/getCardCollections");
  const data = await res.json();
  cardCollections = data.cards;
  selectedCardCollection = cardCollections[0].name
}
async function getSpreads() {
  const res = await fetch("/api/getSpreads");
  const data = await res.json();
  spreads = data.cards;
  selectedSpread = spreads[0];
}

/******************************************
 * Card Interaction Functions
 *******************************************/
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    mousePosX = 0,
    mousePosY = 0;
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

    // get the mouse cursor position at startup:
    mousePosX = e.clientX;
    mousePosY = e.clientY;

    //things to do if it's not the interpretation window
    if (!elmnt.classList.contains('interpretation-window')) {
      interpretationWindow.classList.add('prevent-pointer');
      elmnt.parentNode.appendChild(elmnt)  // move element to sit on top of everything else
      if (elmnt.dataset.spreadPosition) {
        removeFromInterpretationSlot(elmnt);
      }
      elmnt.dataset.spreadPosition = ''  //reset card's spread position
    }

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = mousePosX - e.clientX;
    pos2 = mousePosY - e.clientY;
    mousePosX = e.clientX;
    mousePosY = e.clientY;
    // console.log(pos1, pos2, mousePosX, mousePosY, elmnt.clientHeight, elmnt.offsetTop)

    // set the element's new position. if statement ensures element can't go too far outside window
    if (mousePosX - 10 > 0 && mousePosY - 10 > 0
      && (elmnt.clientWidth / 5) + elmnt.offsetLeft - pos1 < document.body.scrollWidth
      && (elmnt.clientHeight) + elmnt.offsetTop - pos2 < document.body.scrollHeight - 10) {
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
  }
  function closeDragElement() {
    // if card collides with a spread position by over a certain percentage (initially 60%) when dropped,
    // then that card is counted as in that position
    if (elmnt.classList.contains("tarot-container")) {
      spreadPositionsArray.forEach(box => checkCollision(elmnt, box))  // REFACTOR later to just use a for loop since if card is found to be in a spread position, no need to check the rest
    }
    if (!elmnt.classList.contains('interpretation-window')) {
      interpretationWindow.classList.remove('prevent-pointer');
    }

    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.classList.remove('active')
  }
}

function resetShuffle() {
  deck = []
  for (let card of cards) {
    deck.push(card);
  }
  shuffle(deck)
  console.log('deck', deck)
}


/******************************************
 * Tarot Reading Functions
 *******************************************/
function drawCard() {
  if (deck.length < 2) {  // <2 since this method fires after drawing the last card
    // deckImage.classList.remove('reversed')  // just in case deck is reversed from last card
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
  cardbackImg.classList.add('object-fill')
  cardback.appendChild(cardbackImg)
  cardInner.appendChild(cardback)

  // get the next card in the deck
  const selectedCard = deck.shift();
  card.dataset.cardName = `${selectedCard.number.romanize()} ${selectedCard.isMajorArcana ? '' : ' of '} ${selectedCard.suit}`;
  card.dataset.isReversed = selectedCard.isReversed
  card.id = selectedCard._id;

  const cardface = document.createElement('div')
  cardface.classList.add('doublesided-front')
  const cardfaceImg = document.createElement('img')
  cardfaceImg.src = selectedCardFaces.find(cardFace => cardFace.cardId === selectedCard._id).image
  cardfaceImg.alt = 'face'
  cardfaceImg.classList.add('object-fill')
  cardface.appendChild(cardfaceImg)
  cardInner.appendChild(cardface)
  if (selectedCard.isReversed) {
    card.classList.add('reversed')
  }

  // if next card is reversed, flip deckImage so it looks like it
  isNextReversed();

  card.onmouseup = getCardInfo

  function getCardInfo() {
    if (cardDescription.dataset.cardId !== selectedCard._id) {
      cardDescription.scrollTo(0, 0);
    }

    cardInner.classList.add('doublesided-flipped')
    cardNumber.innerText = selectedCard.number.romanize();
    cardSuit.innerText = `${selectedCard.isMajorArcana ? '' : 'of'} ${selectedCard.suit}`;
    upKeywords.innerText = selectedCard.upKeywords;
    upDescription.innerText = selectedCard.upDescription;
    saysReversed.classList.remove('hidden'); // otherwise the words 'reversed' will appear interpretation window before there's any content
    revKeywords.innerText = selectedCard.revKeywords;
    revDescription.innerText = selectedCard.revDescription;

    // scroll to reversed section of card. Currently works pretty badly and needs a better way to do it
    // if (selectedCard.isReversed) {
    //   const reversedContainer = document.getElementById('reversed-container')
    //   reversedContainer.scrollIntoView({ behavior: 'smooth' }, true);
    // }  
    cardDescription.dataset.cardId = selectedCard._id;

  }
}

//REFACTOR to use spread position instead of name, and try to consolidate these two methods into a single one
function slotMeaningOnClick(e) {
  let positionName = e.target.dataset.spreadPosition;
  if (slotTitle.innerText.toLowerCase() !== positionName) {
    slotDescription.scrollTo(0, 0);
  }
  slotTitle.innerText = positionName;
  slotDescriptionText.innerText = selectedSpread.positions.find(position => position.name.toLowerCase() === positionName.toLowerCase()).meaning;
}
function slotMeaningOnCard(positionName) {
  if (slotTitle.innerText.toLowerCase() !== positionName) {
    slotDescription.scrollTo(0, 0);
  }
  slotTitle.innerText = positionName;
  slotDescriptionText.innerText = selectedSpread.positions.find(position => position.name.toLowerCase() === positionName.toLowerCase()).meaning;
}

/***************************************
 * INTERPRETATION FORM FUNCTIONS
 ***************************************/
function checkInterpretation(e) {
  if (validateInterpretation(e)) {
    saveOrSubmitInterpretation(e);
  }
}

function validateInterpretation(e) {
  const cardIdFields = document.querySelectorAll('.interpretation-card-id')
  for (let i = 0; i < cardIdFields.length; i++) {
    if (!cardIdFields[i].value) {
      alert("Please put a card in each of the slots for this spread.")
      e.preventDefault();
      return false;
    }
  }
  return true;
}
function saveOrSubmitInterpretation(e) {

  if (e.target.dataset.username) {
    return
  }
  e.preventDefault();
  const reading = {}
  const elements = Array.prototype.slice.call(e.target.elements);
  elements.forEach(el => {
    if (el.type !== 'submit') {
      reading[el.name] = el.value;
    }
  })
  sessionStorage.setItem('savedTarotReading', JSON.stringify(reading))
  document.getElementById('signup').click();
}

function toggleInterpretation() {
  interpretationBody.classList.toggle('hide')
  const clientHeight = interpretationWindow.clientHeight
  const clientTop = interpretationWindow.offsetTop;
  const scrollHeight = document.body.scrollHeight
  if (clientHeight + clientTop > scrollHeight) {
    interpretationWindow.style.top = scrollHeight - clientHeight - 10 + 'px'
  }

}
function maximizeInterpretation() {
  interpretationBody.classList.remove('hide')

  const clientHeight = interpretationWindow.clientHeight
  const clientTop = interpretationWindow.offsetTop;
  const scrollHeight = document.body.scrollHeight
  if (clientHeight + clientTop > scrollHeight) {
    interpretationWindow.style.top = scrollHeight - clientHeight + 1 + 'px'
  }
}

//queue of cards on a given slot
let pastQueue = []
let presentQueue = []
let futureQueue = []
function addToInterpretationSlot(card, slotName, slotId, queue) {
  slotName.innerText = card.dataset.cardName
  if (card.dataset.isReversed == 'true') slotName.innerText += ' reversed'
  slotId.value = `${card.id}-${card.dataset.isReversed}`;
  queue.push(card)
}
function removeFromInterpretationSlot(elmnt) {
  const slot = elmnt.dataset.spreadPosition;
  let queue;
  let interpretationWindowSlot;
  let interpretationWindowId;
  if (slot === 'past') {
    queue = pastQueue;
    interpretationWindowSlot = pastInterpretationCard;
    interpretationWindowId = pastInterpretationCardId;
  } else if (slot === 'present') {
    queue = presentQueue
    interpretationWindowSlot = presentInterpretationCard;
    interpretationWindowId = presentInterpretationCardId;
  } else if (slot === 'future') {
    queue = futureQueue
    interpretationWindowSlot = futureInterpretationCard;
    interpretationWindowId = futureInterpretationCardId;
  } else {
    console.error('something went wrong in the removefrominterpretationslot')
  }
  queue.pop();
  if (queue.length > 0) {
    const lastElement = queue[queue.length - 1]
    interpretationWindowSlot.innerText = lastElement.dataset.cardName
    if (lastElement.dataset.isReversed == 'true') interpretationWindowSlot.innerText += ' reversed'
    interpretationWindowId.value = `${lastElement.id}-${lastElement.dataset.isReversed}`
  } else {
    interpretationWindowSlot.innerText = ''
    interpretationWindowId.value = ''
  }
}
// collision detection
function checkCollision(card, spreadPosition) {
  let spreadPositionBox = spreadPosition.getBoundingClientRect();
  const cardBox = card.getBoundingClientRect();
  if (cardBox.x < spreadPositionBox.x + spreadPositionBox.width &&
    cardBox.x + cardBox.width > spreadPositionBox.x &&
    cardBox.y < spreadPositionBox.y + spreadPositionBox.height &&
    cardBox.height + cardBox.y > spreadPositionBox.y) {

    const collision = { xLength: 0, yLength: 0 };

    collision.xLength = calculateCollisionLength(cardBox.x, spreadPositionBox.x, cardBox.width, spreadPositionBox.width);
    collision.yLength = calculateCollisionLength(cardBox.y, spreadPositionBox.y, cardBox.height, spreadPositionBox.height);

    if (collision.xLength * collision.yLength > (cardBox.width * cardBox.height * 0.55)) {
      spreadPositionName = spreadPosition.dataset.spreadPosition;
      card.dataset.spreadPosition = spreadPositionName;
      slotMeaningOnCard(spreadPositionName)
      if (spreadPositionName.toLowerCase() === 'past') {
        addToInterpretationSlot(card, pastInterpretationCard, pastInterpretationCardId, pastQueue)
      } else if (spreadPositionName.toLowerCase() === 'present') {
        addToInterpretationSlot(card, presentInterpretationCard, presentInterpretationCardId, presentQueue)
      } else if (spreadPositionName.toLowerCase() === 'future') {
        addToInterpretationSlot(card, futureInterpretationCard, futureInterpretationCardId, futureQueue)
      }
    }
  }
  else return null;
}
function calculateCollisionLength(point1, point2, length1, length2) {
  const pointb1 = point1 + length1;
  const pointb2 = point2 + length2;
  const diff1 = Math.abs(point1 - point2);
  const diff2 = Math.abs(pointb1 - pointb2);
  return (length1 + length2 - diff1 - diff2) / 2;
}

/***************************************
 * UTILITY FUNCTIONS
 ***************************************/
Number.prototype.romanize = function () {
  if (isNaN(this))
    return NaN;
  if (this == 0)
    return 0
  let digits = String(+this).split(""),
    key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
      "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
      "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    roman = "",
    i = 3;
  while (i--)
    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

function isNextReversed() {
  if (deck.length > 1)
    deck[0].isReversed ? deckImage.classList.add('reversed') : deckImage.classList.remove('reversed')
}


/******************
 * DEV FUNCTIONS
******************/
document.querySelectorAll('.click').forEach(e => e.addEventListener('click', () => console.log('clicked on an element')))