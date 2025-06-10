import type { Dispatch, SetStateAction } from "react";

export interface HandModifiers {
  color?: string;
  suits?: Array<string>;
}

export interface RangeSelectorProps {
  selectedHands: Set<string>;
  setSelectedHands: Dispatch<SetStateAction<Set<string>>>;
  handModifiers: Map<string, HandModifiers>;
  setHandModifiers: Dispatch<SetStateAction<Map<string, HandModifiers>>>;
  activeHands?: Map<string, number>;
  name?: string;
}

export interface UserRange {
  name: string;
  value: string;
  modifiers: string;
}
