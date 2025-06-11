import type { COLORS, HANDS_ORDERED, METERS, RANKS, ROUNDS, SUITS } from "./constants";

export interface Equity {
  win: number;
  draw: number;
  equity: number;
}

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
