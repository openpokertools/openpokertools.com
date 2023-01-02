const LOOKUP = require('./lookup');
const FLUSH_LOOKUP = LOOKUP.FLUT;
const UNSUITED_LOOKUP = LOOKUP.ULUT;

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];

const CHAR_RANK_TO_INT_RANK = {
  '2': 0, '3': 1, '4': 2, '5': 3, '6': 4,
  '7': 5, '8': 6, '9': 7, 'T': 8, 'J': 9,
  'Q': 10, 'K': 11, 'A': 12,
};
const CHAR_SUIT_TO_INT_SUIT = {'s': 1, 'h': 2, 'd': 4, 'c': 8};

exports.cardToInt = function(card) {
  const rankChar = card[0];
  const suitChar = card[1];
  const rankInt = CHAR_RANK_TO_INT_RANK[rankChar];
  const suitInt = CHAR_SUIT_TO_INT_SUIT[suitChar];
  const rankPrime = PRIMES[rankInt];
  const bitRank = 1 << rankInt << 16;
  const suit = suitInt << 12;
  const rank = rankInt << 8;
  return bitRank | suit | rank | rankPrime;
};


exports.getRankInt = function(cardInt) {
  return (cardInt >> 8) & 0xF;
};


const getSuitInt = function(cardInt) {
  return (cardInt >> 12) & 0xF;
};
exports.getSuitInt = getSuitInt;


const combinations = function(elements, k) {
  if (k > elements.length || k == 0) {
    return [];
  }

  const indices = [];
  for (let i = k - 1; i >= 0; i--) {
    indices.push(i);
  }

  const combs = [];
  while (true) {
    const comb = [];

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
    if (indices[0] >= elements.length ) {
      break;
    }
  }

  return combs;
};
exports.combinations = combinations;


const combinations75 = function(elements) {
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


const combinations65 = function(elements) {
  return [
    [elements[0], elements[1], elements[2], elements[3], elements[4]],
    [elements[0], elements[1], elements[2], elements[3], elements[5]],
    [elements[0], elements[1], elements[2], elements[4], elements[5]],
    [elements[0], elements[1], elements[3], elements[4], elements[5]],
    [elements[0], elements[2], elements[3], elements[4], elements[5]],
    [elements[1], elements[2], elements[3], elements[4], elements[5]],
  ];
};


exports.evaluate = function(cards, board) {
  const allCards = board.concat(cards);
  let minimum = 7462;
  if (allCards.length === 7) {
    const combs = combinations75(allCards);
    for (let i = 0; i < combs.length; i++) {
      const score = five(combs[i]);
      if (score < minimum) {
        minimum = score;
      }
    }
    return minimum;
  } else if (allCards.length === 6) {
    const combs = combinations65(allCards);
    for (let i = 0; i < combs.length; i++) {
      const score = five(combs[i]);
      if (score < minimum) {
        minimum = score;
      }
    }
    return minimum;
  } else if (allCards.length === 5) {
    return five(allCards);
  }
};


exports.evaluateEarly = function(cards, board, early) {
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
};


const five = function(cards) {
  if (cards[0] & cards[1] & cards[2] & cards[3] & cards[4] & 0xF000) {
    const handOR = (cards[0] | cards[1] | cards[2] | cards[3] | cards[4]) >> 16;
    const prime = primeProductFromRankbits(handOR);
    return FLUSH_LOOKUP.get(prime);
  } else {
    const prime = primeProductFromHand(cards);
    return UNSUITED_LOOKUP.get(prime);
  }
};


exports.evaluateRainbow = function(cards, board) {
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
};


exports.evaluateFlush = function(cards, board) {
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
};


const fiveRainbow = function(cards) {
  const prime = primeProductFromHand(cards);
  return UNSUITED_LOOKUP.get(prime);
};


const fiveFlush = function(cards) {
  const handOR = (cards[0] | cards[1] | cards[2] | cards[3] | cards[4]) >> 16;
  const prime = primeProductFromRankbits(handOR);
  return FLUSH_LOOKUP.get(prime);
};


const primeProductFromHand = function(cardInts) {
  let product = 1;
  for (let i = 0; i < 5; i++) {
    product *= cardInts[i] & 0xFF;
  }
  return product;
};


const primeProductFromRankbits = function(rankbits) {
  let product = 1;
  for (let i = 0; i <= 12; i++) {
    if (rankbits & (1 << i)) {
      product *= PRIMES[i];
    }
  }
  return product;
};


exports.findWinners = function(results) {
  const min = Math.min(...results);
  const winners = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i] == min) {
      winners.push(i);
    }
  }
  return winners;
};
