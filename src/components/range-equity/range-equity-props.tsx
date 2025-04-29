import type { HoleCards } from "../hole-cards/hole-cards-props";
import { HandModifiers } from "../range/range-props";

export interface Player {
  id: number;
  active: boolean;
  holeCards: HoleCards;
  selectedHands: Set<string>;
  handModifiers: Map<string, HandModifiers>;
}

export const createPlayer = (id: number): Player => ({
  id,
  active: true,
  holeCards: {},
  selectedHands: new Set(),
  handModifiers: new Map(),
});

export interface PlayerStats {
  id: number;
  win?: number;
  tie?: number;
  potOdds?: string;
}
