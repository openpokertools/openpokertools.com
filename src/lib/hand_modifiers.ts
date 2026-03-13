import type { Color, Hand, SuitAnnotation } from "./models";
import { setSelectedSuits } from "./suit_utils";

export interface HandModifiers {
  color?: Color;
  suits?: Array<string>;
}

export const toggleHandColor = (
  hand: Hand,
  prev: Map<Hand, HandModifiers>,
  newColor: Color,
): Map<Hand, HandModifiers> => {
  const next = new Map(prev);
  const modifier = next.get(hand) ?? {};
  if (newColor === "green") {
    delete modifier.color;
    if (Object.keys(modifier).length === 0) {
      next.delete(hand);
    } else {
      next.set(hand, { ...modifier });
    }
  } else {
    next.set(hand, { ...modifier, color: newColor });
  }

  return next;
};

export const toggleHandSuits = (
  hand: Hand,
  prev: Map<Hand, HandModifiers>,
  newSuit: SuitAnnotation,
): Map<Hand, HandModifiers> => {
  const next = new Map(prev);

  if (!isSuitValid(hand, newSuit)) {
    return next;
  }

  const modifier = next.get(hand) ?? {};
  const suits = (modifier.suits || []) as SuitAnnotation[];
  const newSuits = setSelectedSuits(hand, newSuit, suits);
  if (newSuits.length === 0) {
    delete modifier.suits;
    if (Object.keys(modifier).length === 0) {
      next.delete(hand);
    } else {
      next.set(hand, { ...modifier });
    }
  } else {
    next.set(hand, { ...modifier, suits: newSuits });
  }
  return next;
};

const isSuitValid = (hand: Hand, suit: SuitAnnotation) => {
  if (suit === "xx") {
    return true;
  }
  if (hand.length === 2) {
    return suit[0] !== suit[1] && suit[0] !== "x";
  } else if (hand[2] === "s") {
    return suit[0] === suit[1];
  } else {
    return suit[0] !== suit[1];
  }
};
