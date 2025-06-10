import { cardToInt, combinations, evaluate, evaluateEarly, findWinners } from "./evaluation_utils";
import type { Equity } from "./models";

const ALLCARDS = [
  69634, 73730, 81922, 98306, 135427, 139523, 147715, 164099, 266757, 270853, 279045, 295429,
  529159, 533255, 541447, 557831, 1053707, 1057803, 1065995, 1082379, 2102541, 2106637, 2114829,
  2131213, 4199953, 4204049, 4212241, 4228625, 8394515, 8398611, 8406803, 8423187, 16783383,
  16787479, 16795671, 16812055, 33560861, 33564957, 33573149, 33589533, 67115551, 67119647,
  67127839, 67144223, 134224677, 134228773, 134236965, 134253349, 268442665, 268446761, 268454953,
  268471337,
];

const getDeck = (exclusions: Set<number>) => {
  const cards = [];
  for (const card of ALLCARDS) {
    if (!exclusions.has(card)) {
      cards.push(card);
    }
  }
  return cards;
};

const randomChoiceN = <T>(choices: Array<T>, n: number): Array<T> => {
  const elements: Array<T> = [];
  while (elements.length < n) {
    const index = Math.floor(Math.random() * choices.length);
    const choice = choices[index];
    if (!elements.includes(choice)) {
      elements.push(choice);
    }
  }
  return elements;
};

const chooseCombo = (
  combos: Array<Array<string>>,
  selectedCards: Set<number>,
): Array<number> | null => {
  for (let i = combos.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = combos[j];
    combos[j] = combos[i];
    combos[i] = x;
    const combo = [cardToInt(x[0]), cardToInt(x[1])];
    if (!(selectedCards.has(combo[0]) || selectedCards.has(combo[1]))) {
      selectedCards.add(combo[0]);
      selectedCards.add(combo[1]);
      return combo;
    }
  }
  return null;
};

export const calculateHandRangeEquity = (
  hand: Array<string>,
  villainCombos: Array<Array<string>>,
  dealtBoard: Array<string>,
): Equity => {
  let wins = 0;
  let ties = 0;
  let n = 0;

  const handInts = hand.map(cardToInt);
  const boardInts = dealtBoard.map(cardToInt);
  const exclusions = new Set(boardInts);
  handInts.forEach((card) => exclusions.add(card));

  if (boardInts.length === 5) {
    const hscore = evaluate(boardInts, handInts);
    for (const villainCombo of villainCombos) {
      const villainComboInts = villainCombo.map(cardToInt);
      const vscore = evaluateEarly(boardInts, villainComboInts, hscore);
      if (hscore < vscore) {
        wins += 1;
      } else if (hscore === vscore) {
        ties += 1;
      }
      n += 1;
    }
  } else {
    const scores = [];
    const deck = getDeck(exclusions);
    const deals = combinations(deck, 5 - boardInts.length);

    for (const deal of deals) {
      const board = boardInts.concat(deal);
      const hscore = evaluate(board, handInts);
      scores.push(hscore);
    }

    for (const villainCombo of villainCombos) {
      const villainComboInts = villainCombo.map(cardToInt);

      for (let i = 0; i < deals.length; i++) {
        const deal = deals[i];
        if (deal.includes(villainComboInts[0]) || deal.includes(villainComboInts[1])) {
          continue;
        }
        const board = boardInts.concat(deal);
        const hscore = scores[i];
        const vscore = evaluateEarly(board, villainComboInts, hscore);
        if (hscore < vscore) {
          wins += 1;
        } else if (hscore === vscore) {
          ties += 1;
        }
        n += 1;
      }
    }
  }
  return {
    win: wins / n,
    draw: ties / n,
    equity: (wins + ties / 2) / n,
  };
};

export const approximateHandRangeEquity = (
  hand: Array<string>,
  villainCombos: Array<Array<string>>,
  n: number,
): Equity => {
  let wins = 0;
  let ties = 0;
  const handInts = hand.map(cardToInt);

  for (let i = 0; i < n; i++) {
    const selectedCombos = [handInts];
    const selectedCards = new Set(handInts);
    const villainCombo = chooseCombo(villainCombos, selectedCards);
    if (villainCombo === null) {
      throw "No viable hand combinations in player ranges";
    }
    selectedCombos.push(villainCombo);
    const deck = getDeck(selectedCards);
    const board = randomChoiceN(deck, 5);
    const results = [];
    for (const h of selectedCombos) {
      results.push(evaluate(board, h));
    }
    if (results[0] < results[1]) {
      wins += 1;
    } else if (results[0] === results[1]) {
      ties += 1;
    }
  }
  return {
    win: wins / n,
    draw: ties / n,
    equity: (wins + ties / 2) / n,
  };
};

export const calculateRangeRangeEquities = (
  playerCombos: Array<Array<Array<string>>>,
  dealtBoard: Array<string>,
): [Array<number>, Array<number>, number] => {
  const n = 5000;
  const wins: Array<number> = new Array(playerCombos.length).fill(0);
  const ties: Array<number> = new Array(playerCombos.length).fill(0);
  const indices = [];
  const board = dealtBoard.map(cardToInt);
  for (let i = 0; i < playerCombos.length; i++) {
    indices.push(i);
  }
  indices.sort((i, j) => {
    return playerCombos[i].length - playerCombos[j].length;
  });

  for (let i = 0; i < n; i++) {
    let selectedCards = new Set(board);
    let selectedCombos = [];
    let selected = false;
    let m = 0;

    while (!selected) {
      selected = true;
      for (const ind of indices) {
        const combo = chooseCombo(playerCombos[ind], selectedCards);
        if (combo === null) {
          selected = false;
          if (m > 2000) {
            throw "No viable hand combinations in player ranges";
          }
          m += 1;
          selectedCards = new Set(board);
          selectedCombos = [];
          break;
        }
        selectedCombos.push(combo);
      }
    }

    const deck = getDeck(selectedCards);
    const iterationBoard = board.concat(randomChoiceN(deck, 5 - board.length));
    const results = [];
    for (const h of selectedCombos) {
      results.push(evaluate(iterationBoard, h));
    }
    const winners = findWinners(results);
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
