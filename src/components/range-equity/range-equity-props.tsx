import { HoleCards } from "../hole-cards/hole-cards-props";

export interface Player {
  id: number;
  active: boolean;
  holeCards: HoleCards;
  selectedHands: Set<string>;
}

export const createPlayer = (id: number): Player => ({
  id,
  active: true,
  holeCards: {},
  selectedHands: new Set(),
});

export interface PlayerStats {
  id: number;
  win?: number;
  tie?: number;
  potOdds?: string;
}
