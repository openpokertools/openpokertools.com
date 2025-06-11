import { SUITS } from "./constants";
import type { Hand, SuitAnnotation } from "./models";

export const isSuitSelected = (hand: Hand, suit: SuitAnnotation, selected: SuitAnnotation[]): boolean => {
  if (suit === "xx") {
    return selected.length === 0;
  }

  if (hand.length === 2) {
    return isSuitSelectedPair(suit, selected);
  } else if (hand[2] === "s") {
    return isSuitSelectedSuited(suit, selected);
  } else {
    return isSuitSelectedOffsuit(suit, selected);
  }
};

const isSuitSelectedPair = (suit: SuitAnnotation, selected: SuitAnnotation[]): boolean => {
  return (
    selected.includes(suit) || selected.includes(`${suit[0]}x` as SuitAnnotation) || selected.includes(`${suit[1]}x` as SuitAnnotation)
  );
};

const isSuitSelectedSuited = (suit: SuitAnnotation, selected: SuitAnnotation[]): boolean => {
  return selected.includes(suit);
};

const isSuitSelectedOffsuit = (suit: SuitAnnotation, selected: SuitAnnotation[]): boolean => {
  return (
    selected.includes(suit) || selected.includes(`${suit[0]}x` as SuitAnnotation) || selected.includes(`x${suit[1]}` as SuitAnnotation)
  );
};

export const setSelectedSuits = (hand: Hand, suit: SuitAnnotation, prevSelected: SuitAnnotation[]): SuitAnnotation[] => {
  if (suit === "xx") {
    return [];
  }

  if (hand.length === 2) {
    return setSelectedSuitsPair(suit, prevSelected);
  } else if (hand[2] === "s") {
    return setSelectedSuitsSuited(suit, prevSelected);
  } else {
    return setSelectedSuitsOffsuit(suit, prevSelected);
  }
};

const setSelectedSuitsPair = (suit: SuitAnnotation, prevSelected: SuitAnnotation[]): SuitAnnotation[] => {
  let allSelected: Set<SuitAnnotation>;
  if (suit[1] === "x") {
    if (prevSelected.includes(suit)) {
      const compact = prevSelected.filter((s) => s !== suit);
      allSelected = expandSelectedSuitsPair(compact);
    } else {
      const compact = [...prevSelected, suit];
      allSelected = expandSelectedSuitsPair(compact);
    }
  } else {
    allSelected = expandSelectedSuitsPair(prevSelected);
    if (allSelected.has(suit)) {
      allSelected.delete(suit);
      allSelected.delete(suit[1] + suit[0] as SuitAnnotation);
    } else {
      allSelected.add(suit);
      allSelected.add(suit[1] + suit[0] as SuitAnnotation);
    }
  }

  return compactSelectedSuitsPair(allSelected);
};

const expandSelectedSuitsPair = (selected: SuitAnnotation[]): Set<SuitAnnotation> => {
  const allSelected: Set<SuitAnnotation> = new Set();
  for (const suitCombo of selected) {
    if (suitCombo[1] === "x") {
      expandX(suitCombo[0], allSelected);
    } else {
      allSelected.add(suitCombo);
      allSelected.add(suitCombo[1] + suitCombo[0] as SuitAnnotation);
    }
  }
  return allSelected;
};

const expandX = (suit0: string, allSelected: Set<SuitAnnotation>) => {
  for (const suit of SUITS) {
    if (suit === suit0) {
      continue;
    }
    allSelected.add(suit0 + suit as SuitAnnotation);
    allSelected.add(suit + suit0 as SuitAnnotation);
  }
};

const compactSelectedSuitsPair = (allSelected: Set<SuitAnnotation>): SuitAnnotation[] => {
  const spades = ["hs", "cs", "ds"];
  const hearts = ["hs", "ch", "dh"];
  const clubs = ["cs", "ch", "dc"];
  const diamonds = ["ds", "dh", "dc"];
  const suitsToCheck = { s: spades, h: hearts, c: clubs, d: diamonds };
  const pairSuitCombos = new Set(["hs", "cs", "ch", "ds", "dh", "dc"]);
  const compact: SuitAnnotation[] = [];

  let all = true;
  for (const [suitToCheck, combos] of Object.entries(suitsToCheck)) {
    if (combos.every((value) => allSelected.has(value as SuitAnnotation))) {
      compact.push(`${suitToCheck}x` as SuitAnnotation);
      combos.forEach((value) => pairSuitCombos.delete(value));
    } else {
      all = false;
    }
  }
  if (all) {
    return [];
  }

  for (const combo of allSelected) {
    if (pairSuitCombos.has(combo)) {
      compact.push(combo);
    }
  }

  return compact;
};

const setSelectedSuitsSuited = (suit: SuitAnnotation, prevSelected: SuitAnnotation[]): SuitAnnotation[] => {
  if (prevSelected.includes(suit)) {
    return prevSelected.filter((s) => s !== suit);
  } else {
    if (prevSelected.length === 3) {
      return [];
    }
    return [...prevSelected, suit];
  }
};

const setSelectedSuitsOffsuit = (suit: SuitAnnotation, prevSelected: SuitAnnotation[]): SuitAnnotation[] => {
  let allSelected: Set<SuitAnnotation>;
  if (suit[0] === "x" || suit[1] === "x") {
    if (prevSelected.includes(suit)) {
      const compact = prevSelected.filter((s) => s !== suit);
      allSelected = expandSelectedSuitsOffsuit(compact);
    } else {
      const compact = [...prevSelected, suit];
      allSelected = expandSelectedSuitsOffsuit(compact);
    }
  } else {
    allSelected = expandSelectedSuitsOffsuit(prevSelected);
    console.log(allSelected);
    if (allSelected.has(suit)) {
      allSelected.delete(suit);
    } else {
      allSelected.add(suit);
    }
  }

  return compactSelectedSuitsOffsuit(allSelected);
};

const expandSelectedSuitsOffsuit = (selected: SuitAnnotation[]): Set<SuitAnnotation> => {
  const allSelected: Set<SuitAnnotation> = new Set();
  for (const suitCombo of selected) {
    if (suitCombo[0] === "x") {
      for (const suit of SUITS) {
        if (suit === suitCombo[1]) {
          continue;
        }
        allSelected.add(suit + suitCombo[1] as SuitAnnotation);
      }
    } else if (suitCombo[1] === "x") {
      for (const suit of SUITS) {
        if (suit === suitCombo[0]) {
          continue;
        }
        allSelected.add(suitCombo[0] + suit as SuitAnnotation);
      }
    } else {
      allSelected.add(suitCombo);
    }
  }
  return allSelected;
};

const compactSelectedSuitsOffsuit = (allSelected: Set<SuitAnnotation>): SuitAnnotation[] => {
  const pairSuitCombos = new Set([
    "sh",
    "sc",
    "sd",
    "hs",
    "hc",
    "hd",
    "cs",
    "ch",
    "cd",
    "ds",
    "dh",
    "dc",
  ]);
  const compact: SuitAnnotation[] = [];

  let all = true;
  for (const suit0 of SUITS) {
    if (SUITS.every((suit1) => suit0 === suit1 || allSelected.has(suit0 + suit1 as SuitAnnotation))) {
      compact.push(`${suit0}x`);
      SUITS.forEach((suit1) => pairSuitCombos.delete(suit0 + suit1));
    } else {
      all = false;
    }

    if (SUITS.every((suit1) => suit0 === suit1 || allSelected.has(suit1 + suit0 as SuitAnnotation))) {
      compact.push(`x${suit0}`);
      SUITS.forEach((suit1) => pairSuitCombos.delete(suit1 + suit0));
    } else {
      all = false;
    }
  }
  if (all) {
    return [];
  }

  for (const combo of allSelected) {
    if (pairSuitCombos.has(combo)) {
      compact.push(combo);
    }
  }

  return compact;
};
