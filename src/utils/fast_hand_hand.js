const evaluationutils = require('./evaluation_utils');

const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const SUITS = ['s', 'h', 'd', 'c'];
const SUIT_MASKS = [0x1000, 0x2000, 0x4000, 0x8000];

const pascalsTriangle = [
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1],
  [1, 5, 10, 10, 5, 1],
];

const binomial = function(n, k) {
  if (k > n) {
    return 0;
  }
  return pascalsTriangle[n][k];
};


const getBinedDeck = function(exclusions) {
  const cards = [];
  const cardSuits = [];

  for (let i = 0; i < RANKS.length; i++) {
    const row = [];
    const rowSuits = [];

    for (let j = 0; j < 4; j++) {
      const card = evaluationutils.cardToInt(RANKS[i] + SUITS[j]);
      if (!exclusions.includes(card)) {
        row.push(card);
        rowSuits.push(SUIT_MASKS[j]);
      }
    }

    cards.push(row);
    cardSuits.push(rowSuits);
  }

  return {cards: cards, cardSuits: cardSuits};
};


const countCards = function(indices) {
  const count = new Map();
  for (const ind of indices) {
    count.set(ind, (count.get(ind) || 0) + 1);
  }
  return count;
};


const calcNumColorings = function(cardCount, deck) {
  let num = 1;
  for (const [k, v] of cardCount) {
    num *= binomial(deck.cards[k].length, v);
  }
  return num;
};


const mostCommon = function(map) {
  let most = 0;
  let mostKey = -1;
  for (const [k, v] of map) {
    if (v > most) {
      most = v;
      mostKey = k;
    }
  }
  return [mostKey, most];
};


const findCount2 = function(map) {
  const out = [];
  for (const [k, v] of map) {
    if (v == 2) {
      out.push(k);
    }
  }
  return out;
};


const flushColorings = function(cardCount, deck) {
  if (cardCount.size == 3) {
    return flushColorings3(cardCount, deck);
  } else if (cardCount.size == 4) {
    return flushColorings4(cardCount, deck);
  } else if (cardCount.size == 5) {
    return flushColorings5(cardCount, deck);
  }
  return [];
};


const flushColorings3 = function(cardCount, deck) {
  const colorings = [];
  const a = mostCommon(cardCount);
  let numVariations;
  if (a[1] == 2) {
    const [k1, k2] = findCount2(cardCount);
    numVariations = (deck.cards[k1].length - 1) * (deck.cards[k2].length - 1);
  } else {
    numVariations = binomial(deck.cards[a[0]].length - 1, 2);
  }

  for (let i = 0; i < SUIT_MASKS.length; i++) {
    const mask = SUIT_MASKS[i];
    const board = [];
    for (const k of cardCount.keys()) {
      if (deck.cardSuits[k].includes(mask)) {
        board.push((deck.cards[k][0] & 0xFFFF0FFF) | mask);
      } else {
        break;
      }
    }
    if (board.length == 3) {
      colorings.push({
        board: board,
        numVariations: numVariations,
        color: mask,
        num: 3,
      });
    }
  }
  return colorings;
};


const flushColorings4 = function(cardCount, deck) {
  const colorings = [];
  const a = mostCommon(cardCount);
  let numVariations;
  const cardCountKeys = Array.from(cardCount.keys());

  const combs = evaluationutils.combinations(cardCountKeys, 3);
  for (let i = 0; i < combs.length; i++) {
    const cards = combs[i];
    const excluded = cardCountKeys.filter((x) => {
      return !cards.includes(x);
    });
    for (let i = 0; i < SUIT_MASKS.length; i++) {
      const mask = SUIT_MASKS[i];
      const board = [];
      for (const k of cards) {
        if (deck.cardSuits[k].includes(mask)) {
          board.push((deck.cards[k][0] & 0xFFFF0FFF) | mask);
        } else {
          break;
        }
      }

      if (board.length == 3) {
        const excludedPossible = deck.cardSuits[excluded[0]].includes(mask);

        if (excludedPossible) {
          if (excluded[0] == a[0]) {
            numVariations = binomial(deck.cards[a[0]].length - 1, 2);
          } else {
            numVariations = (deck.cards[a[0]].length - 1) *
                (deck.cards[excluded[0]].length - 1);
          }
        } else {
          if (excluded[0] == a[0]) {
            numVariations = binomial(deck.cards[a[0]].length, 2);
          } else {
            numVariations = (deck.cards[a[0]].length - 1) *
                deck.cards[excluded[0]].length;
          }
        }
        colorings.push({
          board: board,
          numVariations: numVariations,
          color: mask,
          num: 3,
        });
      }
    }
  }

  numVariations = deck.cards[a[0]].length - 1;

  for (let i = 0; i < SUIT_MASKS.length; i++) {
    const mask = SUIT_MASKS[i];
    const board = [];
    for (const k of cardCount.keys()) {
      if (deck.cardSuits[k].includes(mask)) {
        board.push((deck.cards[k][0] & 0xFFFF0FFF) | mask);
      } else {
        break;
      }
    }
    if (board.length == 4) {
      colorings.push({
        board: board,
        numVariations: numVariations,
        color: mask,
        num: 4,
      });
    }
  }
  return colorings;
};


const flushColorings5 = function(cardCount, deck) {
  const colorings = [];
  let numVariations;
  const cardCountKeys = Array.from(cardCount.keys());

  let combs = evaluationutils.combinations(cardCountKeys, 3);
  for (let i = 0; i < combs.length; i++) {
    const cards = combs[i];
    const excluded = cardCountKeys.filter((x) => {
      return !cards.includes(x);
    });
    for (let i = 0; i < SUIT_MASKS.length; i++) {
      const mask = SUIT_MASKS[i];
      const board = [];
      for (const k of cards) {
        if (deck.cardSuits[k].includes(mask)) {
          board.push((deck.cards[k][0] & 0xFFFF0FFF) | mask);
        } else {
          break;
        }
      }

      if (board.length == 3) {
        const aPossible = deck.cardSuits[excluded[0]].includes(mask);
        const bPossible = deck.cardSuits[excluded[1]].includes(mask);

        if (aPossible && bPossible) {
          numVariations = (deck.cards[excluded[0]].length - 1) *
              (deck.cards[excluded[1]].length - 1);
        } else if (aPossible) {
          numVariations = (deck.cards[excluded[0]].length - 1) *
              deck.cards[excluded[1]].length;
        } else if (bPossible) {
          numVariations = deck.cards[excluded[0]].length *
              (deck.cards[excluded[1]].length - 1);
        } else {
          numVariations = deck.cards[excluded[0]].length *
            deck.cards[excluded[1]].length;
        }

        colorings.push({
          board: board,
          numVariations: numVariations,
          color: mask,
          num: 3,
        });
      }
    }
  }

  combs = evaluationutils.combinations(cardCountKeys, 4);
  for (let i = 0; i < combs.length; i++) {
    const cards = combs[i];
    const excluded = cardCountKeys.filter((x) => {
      return !cards.includes(x);
    });
    for (let i = 0; i < SUIT_MASKS.length; i++) {
      const mask = SUIT_MASKS[i];
      const board = [];
      for (const k of cards) {
        if (deck.cardSuits[k].includes(mask)) {
          board.push((deck.cards[k][0] & 0xFFFF0FFF) | mask);
        } else {
          break;
        }
      }

      if (board.length == 4) {
        const excludedPossible = deck.cardSuits[excluded[0]].includes(mask);
        if (excludedPossible) {
          numVariations = deck.cards[excluded[0]].length - 1;
        } else {
          numVariations = deck.cards[excluded[0]].length;
        }

        colorings.push({
          board: board,
          numVariations: numVariations,
          color: mask,
          num: 4,
        });
      }
    }
  }

  for (let i = 0; i < SUIT_MASKS.length; i++) {
    const mask = SUIT_MASKS[i];
    const board = [];
    for (const k of cardCount.keys()) {
      if (deck.cardSuits[k].includes(mask)) {
        board.push((deck.cards[k][0] & 0xFFFF0FFF) | mask);
      } else {
        break;
      }
    }
    if (board.length == 5) {
      colorings.push({
        board: board,
        numVariations: 1,
        color: mask,
        num: 5,
      });
    }
  }
  return colorings;
};


const suitMatch = function(card, suit) {
  return (card & 0xF000) == suit;
};


const evalHandFlushFast = function(hand, board, rainbowScore, color, numFlush) {
  if (numFlush == 3) {
    if (suitMatch(hand[0], color) && suitMatch(hand[1], color)) {
      return Math.min(rainbowScore, evaluationutils.evaluateFlush(hand, board));
    } else {
      return rainbowScore;
    }
  } else if (numFlush == 4) {
    const h0Match = suitMatch(hand[0], color);
    const h1Match = suitMatch(hand[1], color);
    if (h0Match && h1Match) {
      return Math.min(rainbowScore, evaluationutils.evaluateFlush(hand, board));
    } else if (h0Match) {
      return Math.min(
          rainbowScore,
          evaluationutils.evaluateFlush([hand[0]], board),
      );
    } else if (h1Match) {
      return Math.min(
          rainbowScore,
          evaluationutils.evaluateFlush([hand[1]], board),
      );
    } else {
      return rainbowScore;
    }
  } else if (numFlush == 5) {
    const h0Match = suitMatch(hand[0], color);
    const h1Match = suitMatch(hand[1], color);
    if (h0Match && h1Match) {
      return Math.min(rainbowScore, evaluationutils.evaluateFlush(hand, board));
    } else if (h0Match) {
      return Math.min(
          rainbowScore,
          evaluationutils.evaluateFlush([hand[0]], board),
      );
    } else if (h1Match) {
      return Math.min(
          rainbowScore,
          evaluationutils.evaluateFlush([hand[1]], board),
      );
    } else {
      return Math.min(
          rainbowScore,
          evaluationutils.evaluateFlush([], board),
      );
    }
  }
};


const fastHandHand = function(hands) {
  const wins = new Array(hands.length).fill(0);
  const ties = new Array(hands.length).fill(0);
  let n = 0;

  const deck = getBinedDeck([].concat(...hands));

  const indices = [0, 0, 0, 0, 0];

  while (true) {
    const cardCount = countCards(indices);
    let boardPossible = true;
    for (const [k, v] of cardCount) {
      if (v > deck.cards[k].length) {
        boardPossible = false;
        break;
      }
    }

    if (boardPossible) {
      const numColorings = calcNumColorings(cardCount, deck);
      const board = [];
      for (let i = 0; i < 5; i++) {
        board.push(deck.cards[indices[i]][0]);
      }

      const rainbowScore = [];
      for (let i = 0; i < hands.length; i++) {
        rainbowScore.push(evaluationutils.evaluateRainbow(hands[i], board));
      }

      let m = 0;
      const colorings = flushColorings(cardCount, deck);
      for (let i = 0; i < colorings.length; i++) {
        const coloring = colorings[i];
        const numVariations = coloring.numVariations;
        if (numVariations == 0) {
          continue;
        }
        const flushScore = [];
        for (let j = 0; j < hands.length; j++) {
          flushScore.push(
              evalHandFlushFast(
                  hands[j],
                  coloring.board,
                  rainbowScore[j],
                  coloring.color,
                  coloring.num,
              ),
          );
        }

        const winners = evaluationutils.findWinners(flushScore);
        if (winners.length > 1) {
          for (let j = 0; j < winners.length; j++) {
            ties[winners[j]] += numVariations;
          }
        } else {
          wins[winners[0]] += numVariations;
        }
        m += numVariations;
      }

      const winners = evaluationutils.findWinners(rainbowScore);
      if (winners.length > 1) {
        for (let i = 0; i < winners.length; i++) {
          ties[winners[i]] += numColorings - m;
        }
      } else {
        wins[winners[0]] += numColorings - m;
      }
      n += numColorings;
    }

    for (let i = 0; i < 5; i++) {
      indices[i] += 1;
      if (indices[i] < 13) {
        for (let j = i - 1; j >= 0; j--) {
          indices[j] = indices[i];
        }
        break;
      }
    }
    if (indices[4] > 12) {
      break;
    }
  }

  return [wins, ties, n];
};


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


exports.calculateHandHandEquities = function(handStrings, dealtBoard) {
  const hands = [];
  for (const hand of handStrings) {
    hands.push([
      evaluationutils.cardToInt(hand[0]),
      evaluationutils.cardToInt(hand[1]),
    ]);
  }
  dealtBoard = dealtBoard.map(evaluationutils.cardToInt);

  if (dealtBoard.length < 3) {
    return fastHandHand(hands);
  }


  let n = 0;
  const wins = new Array(hands.length).fill(0);
  const ties = new Array(hands.length).fill(0);

  if (dealtBoard.length == 5) {
    const results = [];
    for (const h of hands) {
      results.push(evaluationutils.evaluate(dealtBoard, h));
    }
    const winners = evaluationutils.findWinners(results);
    if (winners.length > 1) {
      for (const w of winners) {
        ties[w] += 1;
      }
    } else {
      wins[winners[0]] += 1;
    }
    n += 1;
  } else {
    const deck = getDeck(dealtBoard.concat(...hands));
    const deals = evaluationutils.combinations(deck, 5 - dealtBoard.length);
    for (const deal of deals) {
      const board = dealtBoard.concat(deal);
      const results = [];
      for (let j = 0; j < hands.length; j++) {
        results.push(evaluationutils.evaluate(board, hands[j]));
      }
      const winners = evaluationutils.findWinners(results);
      if (winners.length > 1) {
        for (const w of winners) {
          ties[w] += 1;
        }
      } else {
        wins[winners[0]] += 1;
      }
      n += 1;
    }
  }

  return [wins, ties, n];
};
