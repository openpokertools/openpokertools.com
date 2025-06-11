import { SUITS } from "./constants";
import { cardToInt } from "./evaluation_utils";
import type { Card, Combo, Hand } from "./models";

export const handsToCombos = (hands: Set<Hand>): Set<Combo> => {
  const combos: Set<Combo> = new Set();
  for (const h of hands) {
    const expansion = expandHand(h);
    for (const c of expansion) {
      combos.add(c);
    }
  }
  return combos;
};

const expandHand = (hand: Hand): Array<Combo> => {
  const combos: Array<Combo> = [];
  if (hand.length === 2) {
    for (let i = 0; i <= 2; i++) {
      for (let j = i + 1; j <= 3; j++) {
        combos.push([(hand[0] + SUITS[i]) as Card, (hand[1] + SUITS[j]) as Card]);
      }
    }
  } else if (hand[2] === "s") {
    for (const s of SUITS) {
      combos.push([(hand[0] + s) as Card, (hand[1] + s) as Card]);
    }
  } else {
    for (const s1 of SUITS) {
      for (const s2 of SUITS) {
        if (s1 !== s2) {
          combos.push([(hand[0] + s1) as Card, (hand[1] + s2) as Card]);
        }
      }
    }
  }
  return combos;
};

export const handsToComboInts = (hands: Set<Hand>): Array<Array<number>> => {
  const combos: Array<Array<number>> = [];
  for (const h of hands) {
    const expansion = expandHandInts(h);
    for (const c of expansion) {
      combos.push(c);
    }
  }
  return combos;
};

const expandHandInts = (hand: Hand): Array<Array<number>> => {
  const combos: Array<Array<number>> = [];
  if (hand.length === 2) {
    for (let i = 0; i <= 2; i++) {
      for (let j = i + 1; j <= 3; j++) {
        combos.push([
          cardToInt((hand[0] + SUITS[i]) as Card),
          cardToInt((hand[1] + SUITS[j]) as Card),
        ]);
      }
    }
  } else if (hand[2] === "s") {
    for (const s of SUITS) {
      combos.push([cardToInt((hand[0] + s) as Card), cardToInt((hand[1] + s) as Card)]);
    }
  } else {
    for (const s1 of SUITS) {
      for (const s2 of SUITS) {
        if (s1 !== s2) {
          combos.push([cardToInt((hand[0] + s1) as Card), cardToInt((hand[1] + s2) as Card)]);
        }
      }
    }
  }
  return combos;
};
