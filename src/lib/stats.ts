import type { BoardCards } from "@/components/board/board-props";
import type { HoleCards } from "@/components/hole-cards/hole-cards-props";
import type { CombosReport } from "@/components/range-analysis/report-props";
import type { SelectedQualifiers } from "@/components/range-analysis/stats-display-props";

import { METERS } from "./constants";
import { qualifyCards } from "./descriptor_utils";
import { FLOP_STATS } from "./flop_stats";
import type { Card, Combo, Hand, Qualifier, Round } from "./models";
import { handsToCombos } from "./range_utils";

interface Stats {
  counts: Map<Round, Map<Qualifier, number>>;
  combosReport: CombosReport;
  flopActiveHands: Map<Hand, number>;
  turnActiveHands: Map<Hand, number>;
  riverActiveHands: Map<Hand, number>;
  keptToFlop: Array<Combo>;
  keptToTurn: Array<Combo>;
  keptToRiver: Array<Combo>;
  keptToShowdown: Array<Combo>;
}

export const calculateStats = (
  selectedHands: Set<Hand>,
  selectedQualifiers: SelectedQualifiers,
  holeCards: HoleCards,
  boardCards: BoardCards,
): Stats => {
  const stats: Map<Round, Map<Qualifier, number>> = new Map();
  stats.set("preflop", calculatePreFlop(selectedHands));

  const keptToFlop: Array<Combo> = [];
  const keptToTurn: Array<Combo> = [];
  const keptToRiver: Array<Combo> = [];
  const keptToShowdown: Array<Combo> = [];
  const board: Array<Card> = [];

  const combos = handsToCombos(selectedHands);
  const deadCards = new Set([holeCards.hole1!, holeCards.hole2!]);
  for (const c of combos) {
    if (!(deadCards.has(c[0]) || deadCards.has(c[1]))) {
      keptToFlop.push(c);
    }
  }

  const { flop1, flop2, flop3, turn, river } = boardCards;
  const hasFlop = flop1 && flop2 && flop3;
  const hasTurn = hasFlop && turn;
  const hasRiver = hasTurn && river;

  let flopCount = 1;
  if (hasFlop) {
    board.push(flop1, flop2, flop3);
    deadCards.add(flop1);
    deadCards.add(flop2);
    deadCards.add(flop3);
    const checkedQs: Set<Qualifier> = new Set();
    for (const [q, isChecked] of Object.entries(selectedQualifiers.flop) as [
      Qualifier,
      boolean,
    ][]) {
      if (isChecked) {
        checkedQs.add(q);
      }
    }
    const { stats: flopStats, count } = calculatePostFlop(
      keptToFlop,
      keptToTurn,
      board,
      deadCards,
      checkedQs,
    );
    flopCount = count;
    stats.set("flop", flopStats);
  }

  let turnCount = 1;
  if (hasTurn) {
    board.push(turn);
    deadCards.add(turn);
    const checkedQs: Set<Qualifier> = new Set();
    for (const [q, isChecked] of Object.entries(selectedQualifiers.turn) as [
      Qualifier,
      boolean,
    ][]) {
      if (isChecked) {
        checkedQs.add(q);
      }
    }
    const { stats: turnStats, count } = calculatePostFlop(
      keptToTurn,
      keptToRiver,
      board,
      deadCards,
      checkedQs,
    );
    turnCount = count;
    stats.set("turn", turnStats);
  }

  let riverCount = 1;
  if (hasRiver) {
    board.push(river);
    deadCards.add(river);
    const checkedQs: Set<Qualifier> = new Set();
    for (const [q, isChecked] of Object.entries(selectedQualifiers.river) as [
      Qualifier,
      boolean,
    ][]) {
      if (isChecked) {
        checkedQs.add(q);
      }
    }
    const { stats: riverStats, count } = calculatePostFlop(
      keptToRiver,
      keptToShowdown,
      board,
      deadCards,
      checkedQs,
    );
    riverCount = count;
    stats.set("river", riverStats);
  }

  return {
    counts: stats,
    combosReport: {
      flop_combos: keptToTurn.length,
      flop_combos_percent: (keptToTurn.length / (flopCount || 1)) * 100,
      turn_combos: keptToRiver.length,
      turn_combos_percent: (keptToRiver.length / (turnCount || 1)) * 100,
      river_combos: keptToShowdown.length,
      river_combos_percent: (keptToShowdown.length / (riverCount || 1)) * 100,
    },
    flopActiveHands: calculateActiveHandsPercent(keptToTurn),
    turnActiveHands: calculateActiveHandsPercent(keptToRiver),
    riverActiveHands: calculateActiveHandsPercent(keptToShowdown),
    keptToFlop,
    keptToRiver,
    keptToTurn,
    keptToShowdown,
  };
};

interface PostFlopResult {
  stats: Map<Qualifier, number>;
  count: number;
}
const calculatePostFlop = (
  combos: Array<Combo>,
  keptCombos: Array<Combo>,
  board: Array<Card>,
  deadCards: Set<Card>,
  checkedQs: Set<Qualifier>,
): PostFlopResult => {
  const stats: Map<Qualifier, number> = new Map();
  let count = 0;
  for (const m of METERS) {
    stats.set(m, 0);
  }
  for (const c of combos) {
    if (deadCards.has(c[0]) || deadCards.has(c[1])) {
      continue;
    }
    count += 1;
    const qs = qualifyCards(c, board);
    for (const q of qs) {
      stats.set(q, (stats.get(q) ?? 0) + 1);
    }
    if (hasIntersection(qs, checkedQs)) {
      keptCombos.push(c);
    }
  }
  for (const [key, value] of stats) {
    stats.set(key, value / count);
  }
  return { stats, count };
};

const hasIntersection = (listA: Array<string>, setB: Set<string>) => {
  for (const x of listA) {
    if (setB.has(x)) {
      return true;
    }
  }
  return false;
};

const calculatePreFlop = (selectedHands: Set<Hand>): Map<Qualifier, number> => {
  const stats: Map<Qualifier, number> = new Map();
  let count = 0;
  for (const m of METERS) {
    stats.set(m, 0);
  }
  for (const h of selectedHands) {
    let multiplier: number;
    if (h[0] === h[1]) {
      multiplier = 6;
    } else if (h[2] === "s") {
      multiplier = 4;
    } else {
      multiplier = 12;
    }
    count += 19600 * multiplier;
    const made = FLOP_STATS[h];
    for (const [q, v] of Object.entries(made) as [Qualifier, number][]) {
      stats.set(q, (stats.get(q) ?? 0) + multiplier * v);
    }
  }
  for (const [key, value] of stats) {
    stats.set(key, value / count);
  }
  return stats;
};

const calculateActiveHandsPercent = (combos: Array<Combo>): Map<Hand, number> => {
  const activeHands: Map<Hand, number> = new Map();
  for (const c of combos) {
    const { hand, count } = comboToHandAndCount(c);
    activeHands.set(hand, (activeHands.get(hand) || 0) + count);
  }
  return activeHands;
};

interface HandAndCount {
  hand: Hand;
  count: number;
}
const comboToHandAndCount = (combo: Combo): HandAndCount => {
  if (combo[0][0] === combo[1][0]) {
    return { hand: (combo[0][0] + combo[1][0]) as Hand, count: 2 };
  } else if (combo[0][1] === combo[1][1]) {
    return { hand: `${combo[0][0]}${combo[1][0]}s` as Hand, count: 3 };
  } else {
    return { hand: `${combo[0][0]}${combo[1][0]}o` as Hand, count: 1 };
  }
};
