import { BoardCards } from "@/components/board/board-props";
import { HoleCards } from "@/components/hole-cards/hole-cards-props";
import { CombosReport } from "@/components/range-analysis/report-props";
import { SelectedQualifiers } from "@/components/range-analysis/stats-display-props";
import { HANDS_FLOP, METERS } from "./constants";
import { qualifyCards } from "./descriptor_utils";
import { handsToCombos } from "./range_utils";

interface Stats {
  counts: Map<string, Map<string, number>>;
  combosReport: CombosReport;
  flopActiveHands: Map<string, number>;
  turnActiveHands: Map<string, number>;
  riverActiveHands: Map<string, number>;
  keptToFlop: Array<Array<string>>;
  keptToTurn: Array<Array<string>>;
  keptToRiver: Array<Array<string>>;
  keptToShowdown: Array<Array<string>>;
}

export const calculateStats = (
  selectedHands: Set<string>,
  selectedQualifiers: SelectedQualifiers,
  holeCards: HoleCards,
  boardCards: BoardCards,
): Stats => {
  const stats: Map<string, Map<string, number>> = new Map();
  stats.set("preflop", calculatePreFlop(selectedHands));

  const keptToFlop: Array<Array<string>> = [];
  const keptToTurn: Array<Array<string>> = [];
  const keptToRiver: Array<Array<string>> = [];
  const keptToShowdown: Array<Array<string>> = [];
  const board: Array<string> = [];

  const combos = handsToCombos(selectedHands);
  const deadCards = new Set([holeCards.hole1, holeCards.hole2]);
  for (const c of combos) {
    if (!(deadCards.has(c[0]) || deadCards.has(c[1]))) {
      keptToFlop.push(c);
    }
  }

  const flop = boardCards.flop1 && boardCards.flop2 && boardCards.flop3;
  const turn = flop && boardCards.turn;
  const river = turn && boardCards.river;

  let flopCount;
  if (flop) {
    board.push(boardCards.flop1, boardCards.flop2, boardCards.flop3);
    deadCards.add(boardCards.flop1);
    deadCards.add(boardCards.flop2);
    deadCards.add(boardCards.flop3);
    const checkedQs = new Set();
    for (const q in selectedQualifiers["flop"]) {
      if (selectedQualifiers["flop"][q]) {
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

  let turnCount;
  if (turn) {
    board.push(boardCards.turn);
    deadCards.add(boardCards.turn);
    const checkedQs = new Set();
    for (const q in selectedQualifiers["turn"]) {
      if (selectedQualifiers["turn"][q]) {
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

  let riverCount;
  if (river) {
    board.push(boardCards.river);
    deadCards.add(boardCards.river);
    const checkedQs = new Set();
    for (const q in selectedQualifiers["river"]) {
      if (selectedQualifiers["river"][q]) {
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
  stats: Map<string, number>;
  count: number;
}
const calculatePostFlop = (
  combos: Array<Array<string>>,
  keptCombos: Array<Array<string>>,
  board: Array<string>,
  deadCards: Set<string>,
  checkedQs: Set<string>,
): PostFlopResult => {
  const stats: Map<string, number> = new Map();
  let count = 0;
  for (const m of METERS) {
    stats.set(m, 0);
  }
  for (const h of combos) {
    if (deadCards.has(h[0]) || deadCards.has(h[1])) {
      continue;
    }
    count += 1;
    const qs = qualifyCards(h, board);
    for (const q of qs) {
      stats.set(q, stats.get(q) + 1);
    }
    if (hasIntersection(qs, checkedQs)) {
      keptCombos.push(h);
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

const calculatePreFlop = (selectedHands: Set<string>): Map<string, number> => {
  const stats: Map<string, number> = new Map();
  let count = 0;
  for (const m of METERS) {
    stats.set(m, 0);
  }
  for (const h of selectedHands) {
    let multiplier;
    if (h[0] === h[1]) {
      multiplier = 6;
    } else if (h[2] === "s") {
      multiplier = 4;
    } else {
      multiplier = 12;
    }
    count += 19600 * multiplier;
    const made = HANDS_FLOP[h];
    for (const k in made) {
      stats.set(k, stats.get(k) + multiplier * made[k]);
    }
  }
  for (const [key, value] of stats) {
    stats.set(key, value / count);
  }
  return stats;
};

const calculateActiveHandsPercent = (combos: Array<Array<string>>): Map<string, number> => {
  const activeHands: Map<string, number> = new Map();
  for (const c of combos) {
    const { hand, count } = comboToHandAndCount(c);
    activeHands.set(hand, (activeHands.get(hand) || 0) + count);
  }
  return activeHands;
};

interface HandAndCount {
  hand: string;
  count: number;
}
const comboToHandAndCount = function (combo: Array<string>): HandAndCount {
  if (combo[0][0] === combo[1][0]) {
    return { hand: combo[0][0] + combo[1][0], count: 2 };
  } else if (combo[0][1] === combo[1][1]) {
    return { hand: combo[0][0] + combo[1][0] + "s", count: 3 };
  } else {
    return { hand: combo[0][0] + combo[1][0] + "o", count: 1 };
  }
};
