document.querySelectorAll('.reading').forEach(e => {
  const readingId = e.id;

  e.querySelectorAll('.reading-thumbnail').forEach(card => {
    const position = card.alt.trim();
    const interpretation = `#interpretation-${position}-${readingId}`
    card.onmouseenter = () => {
      e.querySelector(interpretation).classList.add('text-primary-focus')

    }
    card.onmouseleave = () => {
      e.querySelector(interpretation).classList.remove('text-primary-focus')
    }
  })
})

// let cards;
// let cardfaces;
// let cardCollections;
// let selectedCardCollection;
// let selectedCardFaces;
// let spreads;

// //initialization
// start();

// async function start() {
//   await getSpreads();
//   await getCards();
//   await getCardCollections();
//   await getCardfaces();
// }

// /**********************************
//  * Card Retrieval
//  **********************************/
// async function getSpreads() {
//   const res = await fetch("/api/getSpreads");
//   const data = await res.json();
//   spreads = data.cards;
//   selectedSpread = spreads[0];
// }
// async function getCards() {
//   const res = await fetch("/api/getCards");
//   const cardJson = await res.json();
//   cards = cardJson.cards;
// }
// async function getCardfaces() {
//   const res = await fetch("/api/getCardfaces");
//   const data = await res.json();
//   cardfaces = data.cards;
//   selectedCardFaces = cardfaces.filter(cardface => cardface.cardCollection === selectedCardCollection)
// }
// async function getCardCollections() {
//   const res = await fetch("/api/getCardCollections");
//   const data = await res.json();
//   cardCollections = data.cards;
//   selectedCardCollection = cardCollections[0].name
// }
