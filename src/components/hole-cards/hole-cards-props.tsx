import type { Dispatch, SetStateAction } from "react";

export interface HoleCardsProps {
  holeCards: HoleCards;
  setHoleCards: Dispatch<SetStateAction<HoleCards>>;
  displayActive?: boolean;
}

export interface HoleCards {
  hole1?: string;
  hole2?: string;
}
