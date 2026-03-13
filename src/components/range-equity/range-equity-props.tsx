import type { HandModifiers } from "@/lib/hand_modifiers";
import type { Hand } from "@/lib/models";

import type { HoleCards } from "../hole-cards/hole-cards-props";

export interface Player {
  id: number;
  active: boolean;
  holeCards: HoleCards;
  selectedHands: Set<Hand>;
  handModifiers: Map<Hand, HandModifiers>;
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
