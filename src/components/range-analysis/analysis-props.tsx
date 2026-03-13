import type { Combo } from "@/lib/models";

import type { BoardCards } from "../board/board-props";
import type { HoleCards } from "../hole-cards/hole-cards-props";

export interface AnalysisHands {
  hole: HoleCards;
  board: BoardCards;
  keptToFlop: Array<Combo>;
  keptToTurn: Array<Combo>;
  keptToRiver: Array<Combo>;
  keptToShowdown: Array<Combo>;
}

export const ANALYSIS_HANDS_DEFAULT: AnalysisHands = {
  hole: {},
  board: {},
  keptToFlop: [],
  keptToTurn: [],
  keptToRiver: [],
  keptToShowdown: [],
};
