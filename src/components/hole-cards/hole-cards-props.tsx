import type { Dispatch, SetStateAction } from "react";

import type { Card } from "@/lib/models";

export interface HoleCardsProps {
  holeCards: HoleCards;
  setHoleCards: Dispatch<SetStateAction<HoleCards>>;
  displayActive?: boolean;
}

export interface HoleCards {
  hole1?: Card;
  hole2?: Card;
}
