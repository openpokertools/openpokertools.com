import { SUITS } from "./constants";
import { cardToInt } from "./evaluation_utils";
import type { HandModifiers } from "./hand_modifiers";
import type { Card, Combo, Hand, SuitAnnotation } from "./models";

export const handsToCombos = (
  hands: Set<Hand>,
  handModifiers: Map<Hand, HandModifiers>,
): Set<Combo> => {
  const combos: Set<Combo> = new Set();
  for (const h of hands) {
    const modifier = handModifiers.get(h) ?? {};
    const suitAnnotations = (modifier.suits || []) as Array<SuitAnnotation>;

    const expansion =
      suitAnnotations.length === 0 ? expandHand(h) : expandHandWithAnnotations(h, suitAnnotations);
    expansion.forEach((c) => combos.add(c));
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

const expandHandWithAnnotations = (
  hand: Hand,
  suitAnnotations: Array<SuitAnnotation>,
): Array<Combo> => {
  if (hand.length === 2) {
    return expandPocketPairWithAnnotations(hand, suitAnnotations);
  } else if (hand[2] === "s") {
    return expandSuitedWithAnnotations(hand, suitAnnotations);
  } else {
    return expandOffsuitWithAnnotations(hand, suitAnnotations);
  }
};

const expandPocketPairWithAnnotations = (
  hand: Hand,
  suitAnnotations: Array<SuitAnnotation>,
): Array<Combo> => {
  const combos: Set<string> = new Set();
  for (const annotation of suitAnnotations) {
    if (annotation[1] === "x") {
      for (const suit of SUITS) {
        if (suit === annotation[0]) {
          continue;
        }
        if (annotation[0] > suit) {
          combos.add(`${hand[0]}${annotation[0]}:${hand[1]}${suit}`);
        } else {
          combos.add(`${hand[0]}${suit}:${hand[1]}${annotation[0]}`);
        }
      }
    } else {
      combos.add(`${hand[0]}${annotation[0]}:${hand[1]}${annotation[1]}`);
    }
  }
  return Array.from(combos, (x) => x.split(":") as Combo);
};

const expandSuitedWithAnnotations = (
  hand: Hand,
  suitAnnotations: Array<SuitAnnotation>,
): Array<Combo> => {
  const combos: Array<Combo> = [];
  for (const annotation of suitAnnotations) {
    combos.push([(hand[0] + annotation[0]) as Card, (hand[1] + annotation[1]) as Card]);
  }
  return combos;
};

const expandOffsuitWithAnnotations = (
  hand: Hand,
  suitAnnotations: Array<SuitAnnotation>,
): Array<Combo> => {
  const combos: Set<string> = new Set();
  for (const annotation of suitAnnotations) {
    if (annotation[0] === "x") {
      for (const suit of SUITS) {
        if (suit === annotation[1]) {
          continue;
        }
        combos.add(`${hand[0]}${suit}:${hand[1]}${annotation[1]}`);
      }
    } else if (annotation[1] === "x") {
      for (const suit of SUITS) {
        if (suit === annotation[0]) {
          continue;
        }
        combos.add(`${hand[0]}${annotation[0]}:${hand[1]}${suit}`);
      }
    } else {
      combos.add(`${hand[0]}${annotation[0]}:${hand[1]}${annotation[1]}`);
    }
  }
  return Array.from(combos, (x) => x.split(":") as Combo);
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
