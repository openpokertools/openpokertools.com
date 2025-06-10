import { SUITS } from "./constants";

export const isSuitSelected = (hand: string, suit: string, selected: string[]): boolean => {
  if (suit === "xx") {
    return selected.length === 0;
  }

  if (hand.length === 2) {
    return isSuitSelectedPair(hand, suit, selected);
  } else if (hand[2] === "s") {
    return isSuitSelectedSuited(hand, suit, selected);
  } else {
    return isSuitSelectedOffsuit(hand, suit, selected);
  }
};

const isSuitSelectedPair = (hand: string, suit: string, selected: string[]): boolean => {
  return (
    selected.includes(suit) || selected.includes(`${suit[0]}x`) || selected.includes(`${suit[1]}x`)
  );
};

const isSuitSelectedSuited = (hand: string, suit: string, selected: string[]): boolean => {
  return selected.includes(suit);
};

const isSuitSelectedOffsuit = (hand: string, suit: string, selected: string[]): boolean => {
  return (
    selected.includes(suit) || selected.includes(`${suit[0]}x`) || selected.includes(`x${suit[1]}`)
  );
};

export const setSelectedSuits = (hand: string, suit: string, prevSelected: string[]): string[] => {
  if (suit === "xx") {
    return [];
  }

  if (hand.length === 2) {
    return setSelectedSuitsPair(hand, suit, prevSelected);
  } else if (hand[2] === "s") {
    return setSelectedSuitsSuited(hand, suit, prevSelected);
  } else {
    return setSelectedSuitsOffsuit(hand, suit, prevSelected);
  }
};

const setSelectedSuitsPair = (hand: string, suit: string, prevSelected: string[]): string[] => {
  let allSelected: Set<string>;
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
      allSelected.delete(suit[1] + suit[0]);
    } else {
      allSelected.add(suit);
      allSelected.add(suit[1] + suit[0]);
    }
  }

  return compactSelectedSuitsPair(allSelected);
};

const expandSelectedSuitsPair = (selected: string[]): Set<string> => {
  const allSelected: Set<string> = new Set();
  for (const suitCombo of selected) {
    if (suitCombo[1] === "x") {
      expandX(suitCombo[0], allSelected);
    } else {
      allSelected.add(suitCombo);
      allSelected.add(suitCombo[1] + suitCombo[0]);
    }
  }
  return allSelected;
};

const expandX = (suit0: string, allSelected: Set<string>) => {
  for (const suit of SUITS) {
    if (suit === suit0) {
      continue;
    }
    allSelected.add(suit0 + suit);
    allSelected.add(suit + suit0);
  }
};

const compactSelectedSuitsPair = (allSelected: Set<string>): string[] => {
  const spades = ["hs", "cs", "ds"];
  const hearts = ["hs", "ch", "dh"];
  const clubs = ["cs", "ch", "dc"];
  const diamonds = ["ds", "dh", "dc"];
  const suitsToCheck = { s: spades, h: hearts, c: clubs, d: diamonds };
  const pairSuitCombos = new Set(["hs", "cs", "ch", "ds", "dh", "dc"]);
  const compact: string[] = [];

  let all = true;
  for (const [suitToCheck, combos] of Object.entries(suitsToCheck)) {
    if (combos.every((value) => allSelected.has(value))) {
      compact.push(`${suitToCheck}x`);
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

const setSelectedSuitsSuited = (hand: string, suit: string, prevSelected: string[]): string[] => {
  if (prevSelected.includes(suit)) {
    return prevSelected.filter((s) => s !== suit);
  } else {
    if (prevSelected.length === 3) {
      return [];
    }
    return [...prevSelected, suit];
  }
};

const setSelectedSuitsOffsuit = (hand: string, suit: string, prevSelected: string[]): string[] => {
  let allSelected: Set<string>;
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

const expandSelectedSuitsOffsuit = (selected: string[]): Set<string> => {
  const allSelected: Set<string> = new Set();
  for (const suitCombo of selected) {
    if (suitCombo[0] === "x") {
      for (const suit of SUITS) {
        if (suit === suitCombo[1]) {
          continue;
        }
        allSelected.add(suit + suitCombo[1]);
      }
    } else if (suitCombo[1] === "x") {
      for (const suit of SUITS) {
        if (suit === suitCombo[0]) {
          continue;
        }
        allSelected.add(suitCombo[0] + suit);
      }
    } else {
      allSelected.add(suitCombo);
    }
  }
  return allSelected;
};

const compactSelectedSuitsOffsuit = (allSelected: Set<string>): string[] => {
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
  const compact: string[] = [];

  let all = true;
  for (const suit0 of SUITS) {
    if (SUITS.every((suit1) => suit0 === suit1 || allSelected.has(suit0 + suit1))) {
      compact.push(`${suit0}x`);
      SUITS.forEach((suit1) => pairSuitCombos.delete(suit0 + suit1));
    } else {
      all = false;
    }

    if (SUITS.every((suit1) => suit0 === suit1 || allSelected.has(suit1 + suit0))) {
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
