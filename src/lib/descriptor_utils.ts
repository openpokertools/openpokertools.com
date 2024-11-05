import { cardToInt, evaluate, getRankInt, getSuitInt } from "./evaluation_utils";

const MAX_STRAIGHT_FLUSH = 10;
const MAX_FOUR_OF_A_KIND = 166;
const MAX_FULL_HOUSE = 322;
const MAX_FLUSH = 1599;
const MAX_STRAIGHT = 1609;
const MAX_THREE_OF_A_KIND = 2467;
const MAX_TWO_PAIR = 3325;
const MAX_PAIR = 6185;
const MAX_HIGH_CARD = 7462;

const MAX_TO_RANK_CLASS: { [key: number]: number } = {
  10: 1,
  166: 2,
  322: 3,
  1599: 4,
  1609: 5,
  2467: 6,
  3325: 7,
  6185: 8,
  7462: 9,
};

const RANK_CLASS_TO_STRING: { [key: number]: string } = {
  1: "straightflush",
  2: "quads",
  3: "fullhouse",
  4: "flush",
  5: "straight",
  6: "trips",
  7: "twopair",
  8: "pair",
  9: "highcard",
};

const scoreToString = (score: number): string | undefined => {
  if (score >= 0 && score <= MAX_STRAIGHT_FLUSH) {
    return RANK_CLASS_TO_STRING[MAX_TO_RANK_CLASS[MAX_STRAIGHT_FLUSH]];
  } else if (score <= MAX_FOUR_OF_A_KIND) {
    return RANK_CLASS_TO_STRING[MAX_TO_RANK_CLASS[MAX_FOUR_OF_A_KIND]];
  } else if (score <= MAX_FULL_HOUSE) {
    return RANK_CLASS_TO_STRING[MAX_TO_RANK_CLASS[MAX_FULL_HOUSE]];
  } else if (score <= MAX_FLUSH) {
    return RANK_CLASS_TO_STRING[MAX_TO_RANK_CLASS[MAX_FLUSH]];
  } else if (score <= MAX_STRAIGHT) {
    return RANK_CLASS_TO_STRING[MAX_TO_RANK_CLASS[MAX_STRAIGHT]];
  } else if (score <= MAX_THREE_OF_A_KIND) {
    return RANK_CLASS_TO_STRING[MAX_TO_RANK_CLASS[MAX_THREE_OF_A_KIND]];
  } else if (score <= MAX_TWO_PAIR) {
    return RANK_CLASS_TO_STRING[MAX_TO_RANK_CLASS[MAX_TWO_PAIR]];
  } else if (score <= MAX_PAIR) {
    return RANK_CLASS_TO_STRING[MAX_TO_RANK_CLASS[MAX_PAIR]];
  } else if (score <= MAX_HIGH_CARD) {
    return RANK_CLASS_TO_STRING[MAX_TO_RANK_CLASS[MAX_HIGH_CARD]];
  }
};

const isPocketPair = (hand: number[]): boolean => {
  return getRankInt(hand[0]) === getRankInt(hand[1]);
};

const isOvercards = (qualifier: string, hand: number[], board: number[]): boolean => {
  const minHand = Math.min(...hand.map(getRankInt));
  const maxBoard = Math.max(...board.map(getRankInt));
  return minHand > maxBoard;
};

const most = (array: number[]): [number, number] => {
  const count: { [key: number]: number } = {};
  for (const x of array) {
    count[x] = (count[x] || 0) + 1;
  }

  let most = 0;
  let mostKey = -1;
  for (const k in count) {
    if (count[k] > most) {
      most = count[k];
      mostKey = parseInt(k);
    }
  }
  return [mostKey, most];
};

const getPairedCardRank = (cards: number[]): number => {
  return most(cards.map(getRankInt))[0];
};

const getFlushCount = (cards: number[]): number => {
  return most(cards.map(getSuitInt))[1];
};

const getStraightDraw = (cards: number[]): string => {
  cards = cards.map(getRankInt);
  if (cards.indexOf(12) >= 0) {
    cards.push(-1);
  }
  cards = cards.sort((a, b) => a - b);

  let pattern = "";
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i + 1] - cards[i] === 0) {
      continue;
    } else if (cards[i + 1] - cards[i] > 9) {
      pattern += "9";
    } else {
      pattern += (cards[i + 1] - cards[i]).toString();
    }
  }

  const gutshotPatterns = ["211", "121", "112"];
  if (pattern.includes("1111")) {
    return "straight";
  } else if (pattern.includes("111") || pattern.includes("2112")) {
    if (
      (pattern.indexOf("111") === 0 && cards[0] === -1) ||
      (pattern.indexOf("111") === pattern.length - 3 && cards[cards.length - 1] === 12)
    ) {
      return "gutshot";
    }
    return "oesd";
  } else if (gutshotPatterns.some((x) => pattern.includes(x))) {
    return "gutshot";
  } else {
    return "none";
  }
};

const getMadeHandSubqualifier = (qualifier: string, hand: number[], board: number[]): string => {
  if (qualifier === "trips") {
    if (isPocketPair(hand)) {
      return "set";
    }
  } else if (qualifier === "pair") {
    const lowBoard = board.every((x) => getRankInt(hand[0]) > getRankInt(x));
    if (isPocketPair(hand) && lowBoard) {
      return "overpair";
    } else {
      const pairRank = getPairedCardRank(hand.concat(...board));
      const pairValue = board.filter((x) => getRankInt(x) > pairRank).length;
      if (pairValue === 0) {
        return "toppair";
      } else if (pairValue === 1) {
        return "secondpair";
      } else {
        return "weakpair";
      }
    }
  } else if (qualifier === "highcard") {
    const ranksList = hand.concat(board).map(getRankInt);
    if (Math.max(...ranksList) === 12) {
      return "acehigh";
    }
  }
  return "none";
};

const getDrawQualifiers = (qualifier: string, hand: number[], board: number[]): string[] => {
  const qualifiers: string[] = [];
  const flushCount = getFlushCount(hand.concat(...board));
  const straightDraw = getStraightDraw(hand.concat(...board));
  if (flushCount === 4) {
    qualifiers.push("flushdraw");
    if (qualifier === "pair") {
      qualifiers.push("flushdraw_pair");
    }
    if (straightDraw === "oesd") {
      qualifiers.push("flushdraw_oesd");
    } else if (straightDraw === "gutshot") {
      qualifiers.push("flushdraw_gutshot");
    }
  } else if (flushCount === 3) {
    qualifiers.push("backdoorflushdraw");
  }

  if (straightDraw === "oesd") {
    qualifiers.push("oesd");
    if (qualifier === "pair") {
      qualifiers.push("oesd_pair");
    }
  } else if (straightDraw === "gutshot") {
    qualifiers.push("gutshot");
    if (qualifier === "pair") {
      qualifiers.push("gutshot_pair");
    } else if (isOvercards(qualifier, hand, board)) {
      qualifiers.push("gutshot_overcards");
    }
  }
  if (isOvercards(qualifier, hand, board)) {
    qualifiers.push("overcards");
  }
  return qualifiers;
};

export const qualifyCards = (hand: string[], board: string[]): string[] => {
  const qualifiers: string[] = [];
  const handInts = hand.map(cardToInt);
  const boardInts = board.map(cardToInt);
  const score = evaluate(handInts, boardInts);
  const qualifier = scoreToString(score);
  if (qualifier) {
    qualifiers.push(qualifier);

    const subq = getMadeHandSubqualifier(qualifier, handInts, boardInts);
    if (subq !== "none") {
      qualifiers.push(subq);
    }

    const drawSubq = getDrawQualifiers(qualifier, handInts, boardInts);
    qualifiers.push(...drawSubq);
  }

  return qualifiers;
};
