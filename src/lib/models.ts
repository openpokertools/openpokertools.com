import type { COLORS, HANDS_ORDERED, METERS, RANKS, ROUNDS, SUITS } from "./constants";

export type Rank = (typeof RANKS)[number];
export type Suit = (typeof SUITS)[number];
export type Card = `${Rank}${Suit}`;
export type Combo = [Card, Card];

export type Hand = (typeof HANDS_ORDERED)[number];
export type Qualifier = (typeof METERS)[number];

export type Round = (typeof ROUNDS)[number];
export type PostFlopRound = Exclude<Round, "preflop">;

export type Color = keyof typeof COLORS;
export type SuitX = Suit | "x";
export type SuitAnnotation = `${SuitX}${SuitX}`;

export interface BoardCards {
  flop1?: Card;
  flop2?: Card;
  flop3?: Card;
  turn?: Card;
  river?: Card;
}

export interface HoleCards {
  hole1?: Card;
  hole2?: Card;
}

export interface CombosReport {
  flop_combos: number;
  flop_combos_percent: number;
  turn_combos: number;
  turn_combos_percent: number;
  river_combos: number;
  river_combos_percent: number;
}

type Qualifiers = {
  [key in Qualifier]: boolean;
};

export interface SelectedQualifiers {
  flop: Qualifiers;
  turn: Qualifiers;
  river: Qualifiers;
}

export interface Equity {
  win: number;
  draw: number;
  equity: number;
}
