import { RANKS } from "./constants";
import type { HandModifiers } from "./hand_modifiers";
import type { Hand, Rank } from "./models";

export const handsToDescriptor = (hands: Set<Hand>): string => {
  let fullDescriptor = "";

  // pocket pairs
  let streak = false;
  let start = "";
  let current = "";
  for (let i = 0; i <= 12; i++) {
    const hand = `${RANKS[i]}${RANKS[i]}` as Hand;
    if (hands.has(hand)) {
      if (!streak) {
        streak = true;
        start = RANKS[i] + RANKS[i];
      }
      current = RANKS[i] + RANKS[i];
    } else {
      if (streak) {
        if (start === current) {
          fullDescriptor += `${current}, `;
        } else if (start === "AA") {
          fullDescriptor += `${current}+, `;
        } else {
          fullDescriptor += `${current}-${start}, `;
        }
      }
      streak = false;
    }
  }
  if (streak) {
    if (start === current) {
      fullDescriptor += `${current}, `;
    } else if (start === "AA") {
      fullDescriptor += `${current}+, `;
    } else {
      fullDescriptor += `${start}-, `;
    }
  }

  // suited
  for (let i = 0; i <= 11; i++) {
    streak = false;
    start = "";
    current = "";
    for (let j = i + 1; j <= 12; j++) {
      const hand = `${RANKS[i]}${RANKS[j]}s` as Hand;
      if (hands.has(hand)) {
        if (!streak) {
          streak = true;
          start = `${RANKS[i]}${RANKS[j]}s`;
        }
        current = `${RANKS[i]}${RANKS[j]}s`;
      } else {
        if (streak) {
          if (start === current) {
            fullDescriptor += `${current}, `;
          } else if (start === `${RANKS[i]}${RANKS[i + 1]}s`) {
            fullDescriptor += `${current}+, `;
          } else {
            fullDescriptor += `${current}-${start}, `;
          }
        }
        streak = false;
      }
    }
    if (streak) {
      if (start === current) {
        fullDescriptor += `${current}, `;
      } else if (start === `${RANKS[i]}${RANKS[i + 1]}s`) {
        fullDescriptor += `${current}+, `;
      } else {
        fullDescriptor += `${start}-, `;
      }
    }
  }

  // offsuit
  for (let i = 0; i <= 11; i++) {
    streak = false;
    start = "";
    current = "";
    for (let j = i + 1; j <= 12; j++) {
      const hand = `${RANKS[i]}${RANKS[j]}o` as Hand;
      if (hands.has(hand)) {
        if (!streak) {
          streak = true;
          start = `${RANKS[i]}${RANKS[j]}o`;
        }
        current = `${RANKS[i]}${RANKS[j]}o`;
      } else {
        if (streak) {
          if (start === current) {
            fullDescriptor += `${current}, `;
          } else if (start === `${RANKS[i]}${RANKS[i + 1]}o`) {
            fullDescriptor += `${current}+, `;
          } else {
            fullDescriptor += `${current}-${start}, `;
          }
        }
        streak = false;
      }
    }
    if (streak) {
      if (start === current) {
        fullDescriptor += `${current}, `;
      } else if (start === `${RANKS[i]}${RANKS[i + 1]}o`) {
        fullDescriptor += `${current}+, `;
      } else {
        fullDescriptor += `${start}-, `;
      }
    }
  }

  if (fullDescriptor.length > 2) {
    fullDescriptor = fullDescriptor.slice(0, -2);
  }

  return fullDescriptor;
};

// Update range
export const descriptorToHands = (descriptor: string): Set<Hand> => {
  const hands = new Set<Hand>();
  const handRanges = descriptor.toUpperCase().split(/[\s,]+/);
  for (let i = 0; i < handRanges.length; i++) {
    const newHands = expandHandRange(handRanges[i]);
    for (let j = 0; j < newHands.length; j++) {
      hands.add(newHands[j]);
    }
  }
  return hands;
};

const expandHandRange = (handRangeString: string): Array<Hand> => {
  const h = handRangeString;
  if (h[h.length - 1] === "+") {
    return expandPlus(h);
  } else if (h[h.length - 1] === "-") {
    return expandMinus(h);
  } else if (h.indexOf("-") >= 0) {
    return expandDash(h);
  } else {
    if (h.length < 2) {
      return [];
    } else if (h.length === 2) {
      return [h as Hand];
    } else {
      return [(h[0] + h[1] + h[2].toLowerCase()) as Hand];
    }
  }
};

const expandPlus = (c: string): Array<Hand> => {
  const hands: Array<Hand> = [];
  const ind = RANKS.indexOf(c[1] as Rank);
  if (c[0] === c[1]) {
    for (let i = 0; i <= ind; i++) {
      hands.push((RANKS[i] + RANKS[i]) as Hand);
    }
  } else {
    const j = RANKS.indexOf(c[0] as Rank);
    for (let k = j + 1; k <= ind; k++) {
      hands.push((c[0] + RANKS[k] + c[2].toLowerCase()) as Hand);
    }
  }
  return hands;
};

const expandMinus = (c: string): Array<Hand> => {
  const hands: Array<Hand> = [];
  const ind = RANKS.indexOf(c[1] as Rank);
  if (c[0] === c[1]) {
    for (let j = ind; j <= 12; j++) {
      hands.push((RANKS[j] + RANKS[j]) as Hand);
    }
  } else {
    for (let j = ind; j <= 12; j++) {
      hands.push((c[0] + RANKS[j] + c[2].toLowerCase()) as Hand);
    }
  }
  return hands;
};

const expandDash = (c: string): Array<Hand> => {
  const hands: Array<Hand> = [];
  const x = c.split("-");
  const start = x[0];
  const end = x[1];
  let i = RANKS.indexOf(start[1] as Rank);
  let j = RANKS.indexOf(end[1] as Rank);

  if (j > i) {
    const tmp = j;
    j = i;
    i = tmp;
  }

  if (start[0] === start[1]) {
    for (let k = j; k <= i; k++) {
      hands.push((RANKS[k] + RANKS[k]) as Hand);
    }
  } else {
    for (let k = j; k <= i; k++) {
      hands.push((start[0] + RANKS[k] + start[2].toLowerCase()) as Hand);
    }
  }
  return hands;
};

export const modifiersToString = (handModifiers: Map<Hand, HandModifiers>) => {
  return JSON.stringify(Object.fromEntries(handModifiers.entries()));
};

export const stringToModifiers = (modifierString: string): Map<Hand, HandModifiers> => {
  return new Map(Object.entries(JSON.parse(modifierString))) as Map<Hand, HandModifiers>;
};
