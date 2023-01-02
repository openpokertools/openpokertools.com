const cardutils = require('./utils/card_utils');
const rangeutils = require('./utils/range_utils');
const displayutils = require('./utils/display_utils');
const equityutils = require('./utils/equity_utils');

let STOP_SIMULATION_FLAG = false;
let RESULTS_CUMULATIVE = [];

const resetResults = function() {
  RESULTS_CUMULATIVE = [];
};


const getID = function(element) {
  return element.attr('id').split('_')[0];
};


const addCards = function(id) {
  const card1 = cardutils.makeHiddenCard(50).attr({
    id: `${id}card1`,
    tabindex: '0',
    playercard: true,
  }).addClass('ml-auto');
  cardutils.addCardSelect(card1);

  const card2 = cardutils.makeHiddenCard(50).attr({
    id: `${id}card2`,
    tabindex: '0',
    playercard: true,
  }).addClass('mr-auto');
  cardutils.addCardSelect(card2);
  const cards = $('<div class="d-flex"></div>');
  cards.append(card1, card2);
  return cards;
};


const addDisplayRow = function(id, name) {
  // eslint-disable-next-line max-len
  const cross = $(`<td id='${id}_delete' style='cursor: pointer; vertical-align: middle; font-size: 1.5rem; font-weight: 700; color: firebrick;'>&times;</td>`);
  cross.click(deletePlayer);
  const cards = addCards(id);
  // eslint-disable-next-line max-len
  const checkbox = $(`<input type='checkbox' id='${id}_box' aria-label='Select player ${id} for simulation' checked>`);
  checkbox.change(resetResults);

  const row = $(`<tr id='${id}_display_row'></tr`)
      .append(
          $(`<td style='vertical-align: middle;'></td>`)
              .append(checkbox),
      )
      // eslint-disable-next-line max-len
      .append($(`<td style='vertical-align: middle;' id='${id}_name'><a href='#${id}_player' style='color: black;'>${name}</a></td>`))
      .append($('<td></td>').append(cards))
      // eslint-disable-next-line max-len
      .append($(`<td style='vertical-align: middle; text-align: center;' id='${id}_percent_display'>0.0%</td>`))
      // eslint-disable-next-line max-len
      .append($(`<td style='vertical-align: middle; text-align: center;' id='${id}_equity'>-</td>`))
      // eslint-disable-next-line max-len
      .append($(`<td style='vertical-align: middle; text-align: center;' id='${id}_tie'>-</td>`))
      // eslint-disable-next-line max-len
      .append($(`<td style='vertical-align: middle; text-align: center;' id='${id}_potodds'>-</td>`))
      .append(cross);
  $('#display_body').append(row);
};


const addPlayer = function() {
  const id = n;
  const title = `Villain ${id}`;
  addDisplayRow(id, title);
  const player = rangeutils.buildRange(title, id);
  player.addClass('rounded my-2 mx-xl-4 mx-2');
  $('#players').append(player);
  n += 1;
};


const addPlayerInitial = function() {
  const id = n;
  let title = '';
  if (id === 0) {
    title = 'Hero';
  } else {
    title = `Villain ${id}`;
  }
  // edit display row
  $(`#${id}_delete`).click(deletePlayer);
  const cards = addCards(id);
  $(`#${id}_cards`).append(cards);
  const player = rangeutils.buildRange(title, id);
  player.addClass('rounded my-2 mx-xl-4 mx-2');
  $(`#${id}_player`).replaceWith(player);
  $(`#${id}_box`).change(resetResults);
  n += 1;
};


const deletePlayer = function() {
  const id = getID($(this));
  const active = $(`#${id}_box`).prop('checked');
  cardutils.removeSelection($(`#${id}card1`).attr('value'));
  cardutils.removeSelection($(`#${id}card2`).attr('value'));
  $(`#${id}_player`).remove();
  $(`#${id}_display_row`).remove();

  if (active) {
    resetResults();
  }
};


// Run simulation

const reportError = function(message) {
  // eslint-disable-next-line max-len
  const error = $('<div class="alert alert-danger alert-dismissible fade show" role="alert"></div>')
      .append(message)
      // eslint-disable-next-line max-len
      .append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
  return $('#simulation_errors').prepend(error);
};


const getBoard = function() {
  const cards = [];
  for (let i = 1; i <= 5; i++) {
    const v = $(`#board${i}`).attr('value');
    if (v !== 'empty') {
      cards.push(v);
    }
  }
  return cards;
};


const clearBoard = function() {
  cardutils.resetCard('board1');
  cardutils.resetCard('board2');
  cardutils.resetCard('board3');
  cardutils.resetCard('board4');
  cardutils.resetCard('board5');
}


const simulate = function() {
  const activePlayers = [];
  $('#display_body > tr').each((i, tr) => {
    const id = getID($(tr));
    if ($(`#${id}_box`).prop('checked')) {
      return activePlayers.push(id);
    } else {
      $(`#${id}_equity`).text('-');
      $(`#${id}_tie`).text('-');
      return $(`#${id}_potodds`).text('-');
    }
  });

  if (activePlayers.length === 0) {
    reportError('No active players to simulate');
    throw 'Failed';
  }

  const playerHands = [];
  try {
    for (const player of activePlayers) {
      playerHands.push(rangeutils.getPlayerHands(player));
    }
  } catch (error) {
    reportError(error);
    throw 'Failed';
  }

  try {
    return equityutils.calculateRangeRangeEquities(
        playerHands,
        getBoard(),
    );
  } catch (error) {
    reportError(error);
    throw error;
  }
};


const displayResults = function(equities, ties, n) {
  const activePlayers = [];
  $('#display_body > tr').each((i, tr) => {
    const id = getID($(tr));
    if ($(`#${id}_box`).prop('checked')) {
      return activePlayers.push(id);
    }
  });

  for (let i = 0; i < activePlayers.length; i++) {
    const id = activePlayers[i];
    const e = (equities[i] / n * 100).toFixed(1);
    $(`#${id}_equity`).text(`${e}%`);
    const t = (ties[i] / n * 100).toFixed(1);
    $(`#${id}_tie`).text(`${t}%`);
    $(`#${id}_potodds`).text(
        displayutils.getPotOdds(equities[i] / n, ties[i] / n));
  }
};


const startSimulation = function() {
  STOP_SIMULATION_FLAG = false;
  resetResults();
  $('#simulate').removeClass('btn-primary');
  $('#simulate').addClass('btn-danger');
  $('#simulate').text('Stop');
  // eslint-disable-next-line max-len
  $('#simulate').prepend($('<span id="simulate_spinner" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>'));
  $('#simulate').off('click');
  return $('#simulate').click(stopSimulation);
};


const stopSimulation = function() {
  STOP_SIMULATION_FLAG = true;
};


const endSimulation = function() {
  $('#simulate').removeClass('btn-danger');
  $('#simulate').addClass('btn-primary');
  $('#simulate_spinner').remove();
  $('#simulate').text('Simulate');
  $('#simulate').off('click');
  return $('#simulate').click(containSimulation);
};


const loopSimulation = function() {
  return setTimeout(() => {
    if (STOP_SIMULATION_FLAG) {
      endSimulation();
    } else {
      let results;
      try {
        results = simulate();
      } catch (error) {
        endSimulation();
        return;
      }
      if (RESULTS_CUMULATIVE.length === 0) {
        RESULTS_CUMULATIVE = results;
      } else {
        for (let i = 0; i < results[0].length; i++) {
          RESULTS_CUMULATIVE[0][i] += results[0][i];
          RESULTS_CUMULATIVE[1][i] += results[1][i];
        }
        RESULTS_CUMULATIVE[2] += results[2];
      }
      displayResults(
          RESULTS_CUMULATIVE[0],
          RESULTS_CUMULATIVE[1],
          RESULTS_CUMULATIVE[2],
      );
      loopSimulation();
    }
  }, 50);
};


const containSimulation = function(event) {
  if (!event.detail || event.detail === 1) {
    startSimulation();
    loopSimulation();
  }
};


window.cardUpdate = function(id) {
  resetResults();
  if ($(`#${id}`).attr('playercard')) {
    const playerID = id[0];
    if ($(`#${playerID}card1`).attr('value') !== 'empty' &&
          $(`#${playerID}card2`).attr('value') !== 'empty') {
      $(`#${playerID}card1`).addClass('inplay');
      $(`#${playerID}card2`).addClass('inplay');
      $(`#${playerID}_percent_display`).css('text-decoration', 'line-through');
    } else {
      $(`#${playerID}card1`).removeClass('inplay');
      $(`#${playerID}card2`).removeClass('inplay');
      $(`#${playerID}_percent_display`).css('text-decoration', 'none');
    }
  }
};

window.rangeUpdate = function(id) {
  resetResults();
};


// build

let n = 0;
rangeutils.loadRanges();
addPlayerInitial();
addPlayerInitial();

const c1 = cardutils.makeHiddenCard(60).attr({
  id: 'board1',
  tabindex: '0',
}).css('margin', '0px 5px 0px 0px').addClass('ml-auto');
cardutils.addCardSelect(c1);

const c2 = cardutils.makeHiddenCard(60).attr({
  id: 'board2',
  tabindex: '0',
}).css('margin', '0px 5px 0px 0px');
cardutils.addCardSelect(c2);

const c3 = cardutils.makeHiddenCard(60).attr({
  id: 'board3',
  tabindex: '0',
}).css('margin', '0px 15px 0px 0px');
cardutils.addCardSelect(c3);

const c4 = cardutils.makeHiddenCard(60).attr({
  id: 'board4',
  tabindex: '0',
}).css('margin', '0px 15px 0px 0px');
cardutils.addCardSelect(c4);

const c5 = cardutils.makeHiddenCard(60).attr({
  id: 'board5',
  tabindex: '0',
}).css('margin', '0px 0px 0px 0px').addClass('mr-auto');
cardutils.addCardSelect(c5);

$('#board').append(c1, c2, c3, c4, c5);
$('#clear_board').click(clearBoard);
$('#add_player').click(addPlayer);
$('#simulate').click(containSimulation);
