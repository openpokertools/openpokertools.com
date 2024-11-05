import { BoardCards } from "../board/board-props";
import { HoleCards } from "../hole-cards/hole-cards-props";

export interface AnalysisHands {
  hole: HoleCards;
  board: BoardCards;
  keptToFlop: Array<Array<string>>;
  keptToTurn: Array<Array<string>>;
  keptToRiver: Array<Array<string>>;
  keptToShowdown: Array<Array<string>>;
}

export const ANALYSIS_HANDS_DEFAULT: AnalysisHands = {
  hole: {},
  board: {},
  keptToFlop: [],
  keptToTurn: [],
  keptToRiver: [],
  keptToShowdown: [],
};
