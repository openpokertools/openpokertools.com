import { SUITS } from "./constants";
import { cardToInt } from "./evaluation_utils";

export const handsToCombos = (hands: Set<string>): Set<Array<string>> => {
  const combos: Set<Array<string>> = new Set();
  for (const h of hands) {
    const expansion = expandHand(h);
    for (const c of expansion) {
      combos.add(c);
    }
  }
  return combos;
};

const expandHand = (hand: string): Array<Array<string>> => {
  const combos: Array<Array<string>> = [];
  if (hand.length === 2) {
    for (let i = 0; i <= 2; i++) {
      for (let j = i + 1; j <= 3; j++) {
        combos.push([hand[0] + SUITS[i], hand[1] + SUITS[j]]);
      }
    }
  } else if (hand[2] === "s") {
    for (const s of SUITS) {
      combos.push([hand[0] + s, hand[1] + s]);
    }
  } else {
    for (const s1 of SUITS) {
      for (const s2 of SUITS) {
        if (s1 !== s2) {
          combos.push([hand[0] + s1, hand[1] + s2]);
        }
      }
    }
  }
  return combos;
};

export const handsToComboInts = (hands: Set<string>): Array<Array<number>> => {
  const combos: Array<Array<number>> = [];
  for (const h of hands) {
    const expansion = expandHandInts(h);
    for (const c of expansion) {
      combos.push(c);
    }
  }
  return combos;
};

const expandHandInts = (hand: string): Array<Array<number>> => {
  const combos: Array<Array<number>> = [];
  if (hand.length === 2) {
    for (let i = 0; i <= 2; i++) {
      for (let j = i + 1; j <= 3; j++) {
        combos.push([
          cardToInt(hand[0] + SUITS[i]),
          cardToInt(hand[1] + SUITS[j]),
        ]);
      }
    }
  } else if (hand[2] === "s") {
    for (const s of SUITS) {
      combos.push([cardToInt(hand[0] + s), cardToInt(hand[1] + s)]);
    }
  } else {
    for (const s1 of SUITS) {
      for (const s2 of SUITS) {
        if (s1 !== s2) {
          combos.push([cardToInt(hand[0] + s1), cardToInt(hand[1] + s2)]);
        }
      }
    }
  }
  return combos;
};
