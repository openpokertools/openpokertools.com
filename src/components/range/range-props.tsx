import type { Dispatch, SetStateAction } from "react";

import type { HandModifiers } from "@/lib/hand_modifiers";
import type { Hand } from "@/lib/models";

export interface RangeSelectorProps {
  selectedHands: Set<Hand>;
  setSelectedHands: Dispatch<SetStateAction<Set<Hand>>>;
  handModifiers: Map<Hand, HandModifiers>;
  setHandModifiers: Dispatch<SetStateAction<Map<Hand, HandModifiers>>>;
  activeHands?: Map<Hand, number>;
  name?: string;
}

export interface UserRange {
  name: string;
  value: string;
  modifiers: string;
}
