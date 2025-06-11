import type { COLORS } from "./constants";
import { setSelectedSuits } from "./suit_utils";

export interface HandModifiers {
  color?: keyof typeof COLORS;
  suits?: Array<string>;
}

export const toggleHandColor = (
  hand: string,
  prev: Map<string, HandModifiers>,
  newColor: keyof typeof COLORS,
): Map<string, HandModifiers> => {
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
  hand: string,
  prev: Map<string, HandModifiers>,
  newSuit: string,
): Map<string, HandModifiers> => {
  const next = new Map(prev);
  const modifier = next.get(hand) ?? {};
  const suits = modifier.suits || [];
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
