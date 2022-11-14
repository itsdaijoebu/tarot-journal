let cards;
let cardfaces;
let cardCollections;
let selectedCardCollection;
let selectedCardFaces;
let spreads;

//initialization
start();

async function start() {
  await getSpreads();
  await getCards();
  await getCardCollections();
  await getCardfaces();
}

/**********************************
 * Card Retrieval
 **********************************/
async function getSpreads() {
  const res = await fetch("/api/getSpreads");
  const data = await res.json();
  spreads = data.cards;
  selectedSpread = spreads[0];
}
async function getCards() {
  const res = await fetch("/api/getCards");
  const cardJson = await res.json();
  cards = cardJson.cards;
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
