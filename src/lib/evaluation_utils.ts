import { FLUSH_LOOKUP, UNSUITED_LOOKUP } from "./lookup";

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];

const CHAR_RANK_TO_INT_RANK: Record<string, number> = {
  "2": 0,
  "3": 1,
  "4": 2,
  "5": 3,
  "6": 4,
  "7": 5,
  "8": 6,
  "9": 7,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12,
};

const CHAR_SUIT_TO_INT_SUIT: Record<string, number> = {
  s: 1,
  h: 2,
  d: 4,
  c: 8,
};

export const cardToInt = (card: string): number => {
  const rankChar = card[0];
  const suitChar = card[1];
  const rankInt = CHAR_RANK_TO_INT_RANK[rankChar];
  const suitInt = CHAR_SUIT_TO_INT_SUIT[suitChar];
  const rankPrime = PRIMES[rankInt];
  const bitRank = (1 << rankInt) << 16;
  const suit = suitInt << 12;
  const rank = rankInt << 8;
  return bitRank | suit | rank | rankPrime;
};

export const getRankInt = (cardInt: number): number => {
  return (cardInt >> 8) & 0xf;
};

export const getSuitInt = (cardInt: number): number => {
  return (cardInt >> 12) & 0xf;
};

export const combinations = <T>(elements: T[], k: number): T[][] => {
  if (k > elements.length || k == 0) {
    return [];
  }

  const indices: Array<number> = [];
  for (let i = k - 1; i >= 0; i--) {
    indices.push(i);
  }

  const combs: T[][] = [];
  while (true) {
    const comb: T[] = [];

    for (let i = 0; i < k; i++) {
      comb.push(elements[indices[i]]);
    }
    combs.push(comb);

    for (let i = 0; i < k; i++) {
      indices[i] += 1;
      if (indices[i] < elements.length - i) {
        for (let j = i - 1; j >= 0; j--) {
          indices[j] = indices[j + 1] + 1;
        }
        break;
      }
    }
    if (indices[0] >= elements.length) {
      break;
    }
  }

  return combs;
};

const combinations75 = <T>(elements: T[]): T[][] => {
  return [
    [elements[0], elements[1], elements[2], elements[3], elements[4]],
    [elements[0], elements[1], elements[2], elements[3], elements[5]],
    [elements[0], elements[1], elements[2], elements[3], elements[6]],
    [elements[0], elements[1], elements[2], elements[4], elements[5]],
    [elements[0], elements[1], elements[2], elements[4], elements[6]],
    [elements[0], elements[1], elements[2], elements[5], elements[6]],
    [elements[0], elements[1], elements[3], elements[4], elements[5]],
    [elements[0], elements[1], elements[3], elements[4], elements[6]],
    [elements[0], elements[1], elements[3], elements[5], elements[6]],
    [elements[0], elements[1], elements[4], elements[5], elements[6]],
    [elements[0], elements[2], elements[3], elements[4], elements[5]],
    [elements[0], elements[2], elements[3], elements[4], elements[6]],
    [elements[0], elements[2], elements[3], elements[5], elements[6]],
    [elements[0], elements[2], elements[4], elements[5], elements[6]],
    [elements[0], elements[3], elements[4], elements[5], elements[6]],
    [elements[1], elements[2], elements[3], elements[4], elements[5]],
    [elements[1], elements[2], elements[3], elements[4], elements[6]],
    [elements[1], elements[2], elements[3], elements[5], elements[6]],
    [elements[1], elements[2], elements[4], elements[5], elements[6]],
    [elements[1], elements[3], elements[4], elements[5], elements[6]],
    [elements[2], elements[3], elements[4], elements[5], elements[6]],
  ];
};

const combinations65 = <T>(elements: T[]): T[][] => {
  return [
    [elements[0], elements[1], elements[2], elements[3], elements[4]],
    [elements[0], elements[1], elements[2], elements[3], elements[5]],
    [elements[0], elements[1], elements[2], elements[4], elements[5]],
    [elements[0], elements[1], elements[3], elements[4], elements[5]],
    [elements[0], elements[2], elements[3], elements[4], elements[5]],
    [elements[1], elements[2], elements[3], elements[4], elements[5]],
  ];
};

export const evaluate = (
  cards: Array<number>,
  board: Array<number>,
): number => {
  const allCards = board.concat(cards);
  let minimum = 7462;
  if (allCards.length === 7) {
    const combs = combinations75(allCards);
    for (const comb of combs) {
      const score = five(comb);
      if (score < minimum) {
        minimum = score;
      }
    }
    return minimum;
  } else if (allCards.length === 6) {
    const combs = combinations65(allCards);
    for (const comb of combs) {
      const score = five(comb);
      if (score < minimum) {
        minimum = score;
      }
    }
    return minimum;
  } else if (allCards.length === 5) {
    return five(allCards);
  }
  return minimum;
};

export const evaluateEarly = (
  cards: Array<number>,
  board: Array<number>,
  early: number,
): number => {
  const allCards = board.concat(cards);
  let minimum = 7462;

  if (allCards.length === 7) {
    const combs = combinations75(allCards);
    for (let i = 0; i < combs.length; i++) {
      const score = five(combs[i]);
      if (score < early) {
        return score;
      }
      if (score < minimum) {
        minimum = score;
      }
    }
    return minimum;
  } else if (allCards.length === 6) {
    const combs = combinations65(allCards);
    for (let i = 0; i < combs.length; i++) {
      const score = five(combs[i]);
      if (score < early) {
        return score;
      }
      if (score < minimum) {
        minimum = score;
      }
    }
    return minimum;
  } else if (allCards.length === 5) {
    return five(allCards);
  }
  throw "Unexpected number of cards";
};

const five = (cards: Array<number>): number => {
  if (cards[0] & cards[1] & cards[2] & cards[3] & cards[4] & 0xf000) {
    const handOR = (cards[0] | cards[1] | cards[2] | cards[3] | cards[4]) >> 16;
    const prime = primeProductFromRankbits(handOR);
    return FLUSH_LOOKUP.get(prime) || 7462;
  } else {
    const prime = primeProductFromHand(cards);
    return UNSUITED_LOOKUP.get(prime) || 7462;
  }
};

const primeProductFromHand = (cardInts: Array<number>): number => {
  return cardInts.reduce((product, cardInt) => product * (cardInt & 0xff), 1);
};

const primeProductFromRankbits = (rankbits: number): number => {
  let product = 1;
  for (let i = 0; i <= 12; i++) {
    if (rankbits & (1 << i)) {
      product *= PRIMES[i];
    }
  }
  return product;
};

export const findWinners = (results: Array<number>): Array<number> => {
  const min = Math.min(...results);
  return results.reduce((winners: Array<number>, result, index) => {
    if (result === min) {
      winners.push(index);
    }
    return winners;
  }, []);
};

export const evaluateRainbow = (
  cards: Array<number>,
  board: Array<number>,
): number => {
  const allCards = board.concat(cards);
  let minimum = 7462;
  if (allCards.length === 7) {
    const combs = combinations75(allCards);
    for (let i = 0; i < combs.length; i++) {
      const score = fiveRainbow(combs[i]);
      if (score < minimum) {
        minimum = score;
      }
    }
    return minimum;
  } else if (allCards.length === 6) {
    const combs = combinations65(allCards);
    for (let i = 0; i < combs.length; i++) {
      const score = fiveRainbow(combs[i]);
      if (score < minimum) {
        minimum = score;
      }
    }
    return minimum;
  } else if (allCards.length === 5) {
    return five(allCards);
  }
  throw "Unexpected number of cards";
};

export const evaluateFlush = (
  cards: Array<number>,
  board: Array<number>,
): number => {
  const allCards = board.concat(cards);
  let minimum = 7462;
  if (allCards.length === 7) {
    const combs = combinations75(allCards);
    for (let i = 0; i < combs.length; i++) {
      const score = fiveFlush(combs[i]);
      if (score < minimum) {
        minimum = score;
      }
    }
    return minimum;
  } else if (allCards.length === 6) {
    const combs = combinations65(allCards);
    for (let i = 0; i < combs.length; i++) {
      const score = fiveFlush(combs[i]);
      if (score < minimum) {
        minimum = score;
      }
    }
    return minimum;
  } else if (allCards.length === 5) {
    return five(allCards);
  }
  throw "Unexpected number of cards";
};

const fiveRainbow = (cards: Array<number>): number => {
  const prime = primeProductFromHand(cards);
  return UNSUITED_LOOKUP.get(prime);
};

const fiveFlush = (cards: Array<number>): number => {
  const handOR = (cards[0] | cards[1] | cards[2] | cards[3] | cards[4]) >> 16;
  const prime = primeProductFromRankbits(handOR);
  return FLUSH_LOOKUP.get(prime);
};
