import type { Dispatch, SetStateAction } from "react";

import type { HoleCards } from "@/lib/models";

export type { HoleCards } from "@/lib/models";

export interface HoleCardsProps {
  holeCards: HoleCards;
  setHoleCards: Dispatch<SetStateAction<HoleCards>>;
  displayActive?: boolean;
}
