export interface RangeSelectorProps {
  selectedHands: Set<string>;
  setSelectedHands: (hands: Set<string>) => void;
  activeHands?: Map<string, number>;
  name?: string;
}
