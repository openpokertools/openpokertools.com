import { RANKS, SUITS } from "./constants";
import {
  cardToInt,
  combinations,
  evaluate,
  evaluateFlush,
  evaluateRainbow,
  findWinners,
} from "./evaluation_utils";
import type { Card, Combo } from "./models";

const SUIT_MASKS = [0x1000, 0x2000, 0x4000, 0x8000];

const pascalsTriangle = [
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1],
  [1, 5, 10, 10, 5, 1],
];

const binomial = (n: number, k: number): number => {
  if (k > n) {
    return 0;
  }
  return pascalsTriangle[n][k];
};

interface BinedDeck {
  cards: Array<Array<number>>;
  cardSuits: Array<Array<number>>;
}

const getBinedDeck = (exclusions: Set<number>): BinedDeck => {
  const cards = [];
  const cardSuits = [];

  for (let i = 0; i < RANKS.length; i++) {
    const row = [];
    const rowSuits = [];

    for (let j = 0; j < 4; j++) {
      const card = cardToInt((RANKS[i] + SUITS[j]) as Card);
      if (!exclusions.has(card)) {
        row.push(card);
        rowSuits.push(SUIT_MASKS[j]);
      }
    }

    cards.push(row);
    cardSuits.push(rowSuits);
  }

  return { cards: cards, cardSuits: cardSuits };
};

const countCards = (indices: Array<number>): Map<number, number> => {
  const count = new Map();
  for (const ind of indices) {
    count.set(ind, (count.get(ind) || 0) + 1);
  }
  return count;
};

const calcNumColorings = (cardCount: Map<number, number>, deck: BinedDeck): number => {
  let num = 1;
  for (const [k, v] of cardCount) {
    num *= binomial(deck.cards[k].length, v);
  }
  return num;
};

const mostCommon = (map: Map<number, number>): [number, number] => {
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

const findCount2 = (map: Map<number, number>): Array<number> => {
  const out = [];
  for (const [k, v] of map) {
    if (v === 2) {
      out.push(k);
    }
  }
  return out;
};

interface FlushColorings {
  board: Array<number>;
  numVariations: number;
  color: number;
  num: number;
}

const flushColorings = (cardCount: Map<number, number>, deck: BinedDeck): Array<FlushColorings> => {
  if (cardCount.size === 3) {
    return flushColorings3(cardCount, deck);
  } else if (cardCount.size === 4) {
    return flushColorings4(cardCount, deck);
  } else if (cardCount.size === 5) {
    return flushColorings5(cardCount, deck);
  }
  return [];
};

const flushColorings3 = (
  cardCount: Map<number, number>,
  deck: BinedDeck,
): Array<FlushColorings> => {
  const colorings = [];
  const a = mostCommon(cardCount);
  let numVariations: number;
  if (a[1] === 2) {
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
        board.push((deck.cards[k][0] & 0xffff0fff) | mask);
      } else {
        break;
      }
    }
    if (board.length === 3) {
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

const flushColorings4 = (
  cardCount: Map<number, number>,
  deck: BinedDeck,
): Array<FlushColorings> => {
  const colorings = [];
  const a = mostCommon(cardCount);
  let numVariations: number;
  const cardCountKeys = Array.from(cardCount.keys());

  const combs = combinations(cardCountKeys, 3);
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
          board.push((deck.cards[k][0] & 0xffff0fff) | mask);
        } else {
          break;
        }
      }

      if (board.length === 3) {
        const excludedPossible = deck.cardSuits[excluded[0]].includes(mask);

        if (excludedPossible) {
          if (excluded[0] === a[0]) {
            numVariations = binomial(deck.cards[a[0]].length - 1, 2);
          } else {
            numVariations = (deck.cards[a[0]].length - 1) * (deck.cards[excluded[0]].length - 1);
          }
        } else {
          if (excluded[0] === a[0]) {
            numVariations = binomial(deck.cards[a[0]].length, 2);
          } else {
            numVariations = (deck.cards[a[0]].length - 1) * deck.cards[excluded[0]].length;
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
        board.push((deck.cards[k][0] & 0xffff0fff) | mask);
      } else {
        break;
      }
    }
    if (board.length === 4) {
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

const flushColorings5 = (
  cardCount: Map<number, number>,
  deck: BinedDeck,
): Array<FlushColorings> => {
  const colorings = [];
  let numVariations: number;
  const cardCountKeys = Array.from(cardCount.keys());

  let combs = combinations(cardCountKeys, 3);
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
          board.push((deck.cards[k][0] & 0xffff0fff) | mask);
        } else {
          break;
        }
      }

      if (board.length === 3) {
        const aPossible = deck.cardSuits[excluded[0]].includes(mask);
        const bPossible = deck.cardSuits[excluded[1]].includes(mask);

        if (aPossible && bPossible) {
          numVariations =
            (deck.cards[excluded[0]].length - 1) * (deck.cards[excluded[1]].length - 1);
        } else if (aPossible) {
          numVariations = (deck.cards[excluded[0]].length - 1) * deck.cards[excluded[1]].length;
        } else if (bPossible) {
          numVariations = deck.cards[excluded[0]].length * (deck.cards[excluded[1]].length - 1);
        } else {
          numVariations = deck.cards[excluded[0]].length * deck.cards[excluded[1]].length;
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

  combs = combinations(cardCountKeys, 4);
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
          board.push((deck.cards[k][0] & 0xffff0fff) | mask);
        } else {
          break;
        }
      }

      if (board.length === 4) {
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
        board.push((deck.cards[k][0] & 0xffff0fff) | mask);
      } else {
        break;
      }
    }
    if (board.length === 5) {
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

const suitMatch = (card: number, suit: number): boolean => {
  return (card & 0xf000) === suit;
};

const evalHandFlushFast = (
  hand: Array<number>,
  board: Array<number>,
  rainbowScore: number,
  color: number,
  numFlush: number,
): number => {
  if (numFlush === 3) {
    if (suitMatch(hand[0], color) && suitMatch(hand[1], color)) {
      return Math.min(rainbowScore, evaluateFlush(hand, board));
    } else {
      return rainbowScore;
    }
  } else if (numFlush === 4) {
    const h0Match = suitMatch(hand[0], color);
    const h1Match = suitMatch(hand[1], color);
    if (h0Match && h1Match) {
      return Math.min(rainbowScore, evaluateFlush(hand, board));
    } else if (h0Match) {
      return Math.min(rainbowScore, evaluateFlush([hand[0]], board));
    } else if (h1Match) {
      return Math.min(rainbowScore, evaluateFlush([hand[1]], board));
    } else {
      return rainbowScore;
    }
  } else if (numFlush === 5) {
    const h0Match = suitMatch(hand[0], color);
    const h1Match = suitMatch(hand[1], color);
    if (h0Match && h1Match) {
      return Math.min(rainbowScore, evaluateFlush(hand, board));
    } else if (h0Match) {
      return Math.min(rainbowScore, evaluateFlush([hand[0]], board));
    } else if (h1Match) {
      return Math.min(rainbowScore, evaluateFlush([hand[1]], board));
    } else {
      return Math.min(rainbowScore, evaluateFlush([], board));
    }
  }
  throw "Unexpected number of flushes";
};

const fastHandHand = (hands: Array<Array<number>>): [Array<number>, Array<number>, number] => {
  const wins = new Array(hands.length).fill(0);
  const ties = new Array(hands.length).fill(0);
  let n = 0;

  const exclusions: Set<number> = new Set();
  for (const hand of hands) {
    exclusions.add(hand[0]);
    exclusions.add(hand[1]);
  }
  const deck = getBinedDeck(exclusions);

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
        rainbowScore.push(evaluateRainbow(hands[i], board));
      }

      let m = 0;
      const colorings = flushColorings(cardCount, deck);
      for (let i = 0; i < colorings.length; i++) {
        const coloring = colorings[i];
        const numVariations = coloring.numVariations;
        if (numVariations === 0) {
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

        const winners = findWinners(flushScore);
        if (winners.length > 1) {
          for (let j = 0; j < winners.length; j++) {
            ties[winners[j]] += numVariations;
          }
        } else {
          wins[winners[0]] += numVariations;
        }
        m += numVariations;
      }

      const winners = findWinners(rainbowScore);
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
  69634, 73730, 81922, 98306, 135427, 139523, 147715, 164099, 266757, 270853, 279045, 295429,
  529159, 533255, 541447, 557831, 1053707, 1057803, 1065995, 1082379, 2102541, 2106637, 2114829,
  2131213, 4199953, 4204049, 4212241, 4228625, 8394515, 8398611, 8406803, 8423187, 16783383,
  16787479, 16795671, 16812055, 33560861, 33564957, 33573149, 33589533, 67115551, 67119647,
  67127839, 67144223, 134224677, 134228773, 134236965, 134253349, 268442665, 268446761, 268454953,
  268471337,
];

const getDeck = (exclusions: Array<number>): Array<number> => {
  const cards = [];
  for (const card of ALLCARDS) {
    if (!exclusions.includes(card)) {
      cards.push(card);
    }
  }
  return cards;
};

export const calculateHandHandEquities = (
  handStrings: Array<Combo>,
  dealtBoard: Array<Card>,
): [Array<number>, Array<number>, number] => {
  const hands = [];
  for (const hand of handStrings) {
    hands.push([cardToInt(hand[0]), cardToInt(hand[1])]);
  }
  const board = dealtBoard.map(cardToInt);

  if (board.length < 3) {
    return fastHandHand(hands);
  }

  let n = 0;
  const wins = new Array(hands.length).fill(0);
  const ties = new Array(hands.length).fill(0);

  if (board.length === 5) {
    const results = [];
    for (const h of hands) {
      results.push(evaluate(board, h));
    }
    const winners = findWinners(results);
    if (winners.length > 1) {
      for (const w of winners) {
        ties[w] += 1;
      }
    } else {
      wins[winners[0]] += 1;
    }
    n += 1;
  } else {
    const deck = getDeck(board.concat(...hands));
    const deals = combinations(deck, 5 - board.length);
    for (const deal of deals) {
      const boardFull = board.concat(deal);
      const results = [];
      for (let j = 0; j < hands.length; j++) {
        results.push(evaluate(boardFull, hands[j]));
      }
      const winners = findWinners(results);
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
