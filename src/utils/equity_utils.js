const evaluationutils = require('./evaluation_utils');


const ALLCARDS = [
  69634, 73730, 81922, 98306, 135427, 139523, 147715, 164099, 266757, 270853,
  279045, 295429, 529159, 533255, 541447, 557831, 1053707, 1057803, 1065995,
  1082379, 2102541, 2106637, 2114829, 2131213, 4199953, 4204049, 4212241,
  4228625, 8394515, 8398611, 8406803, 8423187, 16783383, 16787479, 16795671,
  16812055, 33560861, 33564957, 33573149, 33589533, 67115551, 67119647,
  67127839, 67144223, 134224677, 134228773, 134236965, 134253349, 268442665,
  268446761, 268454953, 268471337,
];


const getDeck = function(exclusions) {
  const cards = [];
  for (const card of ALLCARDS) {
    if (!exclusions.includes(card)) {
      cards.push(card);
    }
  }
  return cards;
};


const randomChoiceN = function(choices, n) {
  const elements = [];
  while (elements.length < n) {
    const index = Math.floor(Math.random() * choices.length);
    const choice = choices[index];
    if (!elements.includes(choice)) {
      elements.push(choice);
    }
  }
  return elements;
};


const chooseHand = function(hands, selectedCards) {
  for (let i = hands.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = hands[j];
    hands[j] = hands[i];
    hands[i] = x;
    const hand = [
      evaluationutils.cardToInt(x[0]),
      evaluationutils.cardToInt(x[1]),
    ];
    if (!(selectedCards.has(hand[0]) || selectedCards.has(hand[1]))) {
      selectedCards.add(hand[0]);
      selectedCards.add(hand[1]);
      return hand;
    }
  }
  return false;
};


exports.calculateHandRangeEquity = function(hand, villainHands, dealtBoard) {
  let wins = 0;
  let ties = 0;
  let n = 0;

  hand = hand.map(evaluationutils.cardToInt);
  dealtBoard = dealtBoard.map(evaluationutils.cardToInt);

  if (dealtBoard.length === 5) {
    const hscore = evaluationutils.evaluate(dealtBoard, hand);
    for (let villainHand of villainHands) {
      villainHand = villainHand.map(evaluationutils.cardToInt);
      const vscore = evaluationutils.evaluateEarly(
          dealtBoard, villainHand, hscore);
      if (hscore < vscore) {
        wins += 1;
      } else if (hscore === vscore) {
        ties += 1;
      }
      n += 1;
    }
  } else {
    const scores = [];
    const deck = getDeck(dealtBoard.concat(hand));
    const deals =evaluationutils.combinations(deck, 5 - dealtBoard.length);

    for (const deal of deals) {
      const board = dealtBoard.concat(deal);
      const hscore = evaluationutils.evaluate(board, hand);
      scores.push(hscore);
    }

    for (let villainHand of villainHands) {
      villainHand = villainHand.map(evaluationutils.cardToInt);

      for (let i = 0; i < deals.length; i++) {
        const deal = deals[i];
        if (deal.includes(villainHand[0]) || deal.includes(villainHand[1])) {
          continue;
        }
        const board = dealtBoard.concat(deal);
        const hscore = scores[i];
        const vscore = evaluationutils.evaluateEarly(
            board, villainHand, hscore);
        if (hscore < vscore) {
          wins += 1;
        } else if (hscore === vscore) {
          ties += 1;
        }
        n += 1;
      }
    }
  }
  return [wins / n, ties / n];
};


exports.approximateHandRangeEquity = function(hand, villainHands, n) {
  let wins = 0;
  let ties = 0;
  hand = hand.map(evaluationutils.cardToInt);
  for (let i = 0; i < n; i++) {
    const selectedHands = [hand];
    const selectedCards = new Set(hand);
    const villainHand = chooseHand(villainHands, selectedCards);
    if (villainHand === false) {
      throw 'No viable hand combinations in player ranges';
    }
    selectedHands.push(villainHand);
    const deck = getDeck([].concat(...selectedHands));
    const board = randomChoiceN(deck, 5);
    const results = [];
    for (const h of selectedHands) {
      results.push(evaluationutils.evaluate(board, h));
    }
    if (results[0] < results[1]) {
      wins += 1;
    } else if (results[0] === results[1]) {
      ties += 1;
    }
  }
  return [wins / n, ties / n];
};


exports.calculateRangeRangeEquities = function(playerHands, dealtBoard) {
  const n = 5000;
  const wins = new Array(playerHands.length).fill(0);
  const ties = new Array(playerHands.length).fill(0);
  const indices = [];
  dealtBoard = dealtBoard.map(evaluationutils.cardToInt);
  for (let i = 0; i < playerHands.length; i++) {
    indices.push(i);
  }
  indices.sort((i, j) => {
    return playerHands[i].length - playerHands[j].length;
  });

  for (let i = 0; i < n; i++) {
    let selectedCards = new Set(dealtBoard);
    let selectedHands = [];
    let selected = false;
    let m = 0;

    while (!selected) {
      selected = true;
      for (const ind of indices) {
        const hand = chooseHand(playerHands[ind], selectedCards);
        if (hand === false) {
          selected = false;
          if (m > 2000) {
            throw 'No viable hand combinations in player ranges';
          }
          m += 1;
          selectedCards = new Set(dealtBoard);
          selectedHands = [];
          break;
        }
        selectedHands.push(hand);
      }
    }

    const deck = getDeck(dealtBoard.concat(...selectedHands));
    const board = dealtBoard.concat(randomChoiceN(deck, 5 - dealtBoard.length));
    const results = [];
    for (const h of selectedHands) {
      results.push(evaluationutils.evaluate(board, h));
    }
    const winners = evaluationutils.findWinners(results);
    if (winners.length > 1) {
      for (const w of winners) {
        ties[indices[w]] += 1;
      }
    } else {
      wins[indices[winners[0]]] += 1;
    }
  }
  return [wins, ties, n];
};
