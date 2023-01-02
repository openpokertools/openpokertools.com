const fasthandhand = require('./utils/fast_hand_hand.js');
const cardutils = require('./utils/card_utils.js');
const displayutils = require('./utils/display_utils.js');


function addCards(id) {
  const card1 = cardutils.makeHiddenCard(50)
      .attr({
        id: `${id}card1`,
        tabindex: '0',
        playercard: true,
      })
      .addClass('ml-auto');
  cardutils.addCardSelect(card1);
  const card2 = cardutils.makeHiddenCard(50)
      .attr({
        id: `${id}card2`,
        tabindex: '0',
        playercard: true,
      })
      .addClass('mr-auto');
  cardutils.addCardSelect(card2);
  const cards = $('<div class="d-flex"></div>');
  cards.append(card1, card2);
  return cards;
}


function addPlayerCards() {
  for (let i = 0; i < 9; i++) {
    const cards = addCards(i);
    $(`#${i}_cards`).append(cards);
  }
}


function simulate() {
  const hands = [];
  const indices = [];

  for (let i = 0; i < 9; i++) {
    const c1 = $(`#${i}card1`).attr('value');
    const c2 = $(`#${i}card2`).attr('value');

    if (c1 == 'empty' || c2 == 'empty') {
      continue;
    }
    hands.push([c1, c2]);
    indices.push(i);
  }

  if (hands.length < 2) {
    return;
  }

  const board = [];
  for (let i = 1; i <= 5; i++) {
    const c = $(`#board${i}`).attr('value');
    if (c != 'empty') {
      board.push(c);
    }
  }

  const scores = fasthandhand.calculateHandHandEquities(hands, board);
  for (let i = 0; i < 9; i++) {
    clearResults(i);
  }

  for (let i = 0; i < hands.length; i++) {
    displayResults(indices[i], scores[0][i], scores[1][i], scores[2]);
  }
}


function displayResults(index, equity, tie, n) {
  const e = (equity / n * 100).toFixed(1);
  $(`#${index}_equity`).text(`${e}%`);
  const t = (tie / n * 100).toFixed(1);
  $(`#${index}_tie`).text(`${t}%`);
  $(`#${index}_potodds`).text(displayutils.getPotOdds(equity / n, tie / n));
}


function clearResults(index) {
  $(`#${index}_equity`).text('-');
  $(`#${index}_tie`).text('-');
  $(`#${index}_potodds`).text('-');
}


function addBoard() {
  const c1 = cardutils.makeHiddenCard(60)
      .attr({
        id: 'board1',
        tabindex: '0',
      })
      .css('margin', '0px 5px 0px 0px')
      .addClass('ml-auto');
  cardutils.addCardSelect(c1);

  const c2 = cardutils.makeHiddenCard(60)
      .attr({
        id: 'board2',
        tabindex: '0',
      })
      .css('margin', '0px 5px 0px 0px');
  cardutils.addCardSelect(c2);

  const c3 = cardutils.makeHiddenCard(60)
      .attr({
        id: 'board3',
        tabindex: '0',
      })
      .css('margin', '0px 15px 0px 0px');
  cardutils.addCardSelect(c3);

  const c4 = cardutils.makeHiddenCard(60)
      .attr({
        id: 'board4',
        tabindex: '0',
      })
      .css('margin', '0px 15px 0px 0px');
  cardutils.addCardSelect(c4);

  const c5 = cardutils.makeHiddenCard(60)
      .attr({
        id: 'board5',
        tabindex: '0',
      })
      .css('margin', '0px 0px 0px 0px')
      .addClass('mr-auto');
  cardutils.addCardSelect(c5);

  $('#board').append(c1, c2, c3, c4, c5);
}


window.cardUpdate = function(id) {
  simulate();
};


addBoard();
addPlayerCards();
simulate();
