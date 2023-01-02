const evaluationutils = require('./evaluation_utils');

const MAX_STRAIGHT_FLUSH = 10;
const MAX_FOUR_OF_A_KIND = 166;
const MAX_FULL_HOUSE = 322;
const MAX_FLUSH = 1599;
const MAX_STRAIGHT = 1609;
const MAX_THREE_OF_A_KIND = 2467;
const MAX_TWO_PAIR = 3325;
const MAX_PAIR = 6185;
const MAX_HIGH_CARD = 7462;

const MAX_TO_RANK_CLASS = {
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

const RANK_CLASS_TO_STRING = {
  1: 'straightflush',
  2: 'quads',
  3: 'fullhouse',
  4: 'flush',
  5: 'straight',
  6: 'trips',
  7: 'twopair',
  8: 'pair',
  9: 'highcard',
};


const scoreToString = function(score) {
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


const isPocketPair = function(hand) {
  return evaluationutils.getRankInt(hand[0]) ===
      evaluationutils.getRankInt(hand[1]);
};


const isOvercards = function(qualifier, hand, board) {
  const minHand = Math.min(...hand.map(evaluationutils.getRankInt));
  const maxBoard = Math.max(...board.map(evaluationutils.getRankInt));
  return minHand > maxBoard;
};


const most = function(array) {
  const count = {};
  for (const x of array) {
    count[x] = (count[x] || 0) + 1;
  }

  let most = 0;
  let mostKey = -1;
  for (const k in count) {
    if (count[k] > most) {
      most = count[k];
      mostKey = k;
    }
  }
  return [Number(mostKey), most];
};


const getPairedCardRank = function(cards) {
  return most(cards.map(evaluationutils.getRankInt))[0];
};


const getFlushCount = function(cards) {
  return most(cards.map(evaluationutils.getSuitInt))[1];
};


const getStraightDraw = function(cards) {
  cards = cards.map(evaluationutils.getRankInt);
  if (cards.indexOf(12) >= 0) {
    cards.push(-1);
  }
  cards = cards.sort((a, b) => {
    return a - b;
  });

  let pattern = '';
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i + 1] - cards[i] === 0) {
      continue;
    } else if (cards[i + 1] - cards[i] > 9) {
      pattern += '9';
    } else {
      pattern += cards[i + 1] - cards[i];
    }
  }

  const gutshotPatterns = ['211', '121', '112'];
  if (pattern.includes('1111')) {
    return 'straight';
  } else if (pattern.includes('111') || pattern.includes('2112')) {
    if (
      (pattern.indexOf('111') === 0 && cards[0] === -1) ||
        (pattern.indexOf('111') === pattern.length - 3 &&
          cards[cards.length - 1] === 12)) {
      return 'gutshot';
    }
    return 'oesd';
  } else if (gutshotPatterns.some((x) => {
    return pattern.includes(x);
  })) {
    return 'gutshot';
  } else {
    return 'none';
  }
};


const getMadeHandSubqualifier = function(qualifier, hand, board) {
  if (qualifier === 'trips') {
    if (isPocketPair(hand)) {
      return 'set';
    }
  } else if (qualifier === 'pair') {
    const lowBoard = board.every((x) => {
      return evaluationutils.getRankInt(
          hand[0]) > evaluationutils.getRankInt(x);
    });
    if (isPocketPair(hand) && lowBoard) {
      return 'overpair';
    } else {
      const pairRank = getPairedCardRank(hand.concat(...board));
      const pairValue = board.filter((x) => {
        return evaluationutils.getRankInt(x) > pairRank;
      }).length;
      if (pairValue === 0) {
        return 'toppair';
      } else if (pairValue === 1) {
        return 'secondpair';
      } else {
        return 'weakpair';
      }
    }
  } else if (qualifier === 'highcard') {
    const ranksList = hand.concat(board).map(evaluationutils.getRankInt);
    if (Math.max(...ranksList) === 12) {
      return 'acehigh';
    }
  }
  return 'none';
};


const getDrawQualifiers = function(qualifier, hand, board) {
  const qualifiers = [];
  const flushCount = getFlushCount(hand.concat(...board));
  const straightDraw = getStraightDraw(hand.concat(...board));
  if (flushCount === 4) {
    qualifiers.push('flushdraw');
    if (qualifier === 'pair') {
      qualifiers.push('flushdraw_pair');
    }
    if (straightDraw === 'oesd') {
      qualifiers.push('flushdraw_oesd');
    } else if (straightDraw === 'gutshot') {
      qualifiers.push('flushdraw_gutshot');
    }
  } else if (flushCount === 3) {
    qualifiers.push('backdoorflushdraw');
  }

  if (straightDraw === 'oesd') {
    qualifiers.push('oesd');
    if (qualifier === 'pair') {
      qualifiers.push('oesd_pair');
    }
  } else if (straightDraw === 'gutshot') {
    qualifiers.push('gutshot');
    if (qualifier === 'pair') {
      qualifiers.push('gutshot_pair');
    } else if (isOvercards(qualifier, hand, board)) {
      qualifiers.push('gutshot_overcards');
    }
  }
  if (isOvercards(qualifier, hand, board)) {
    qualifiers.push('overcards');
  }
  return qualifiers;
};

exports.qualifyCards = function(hand, board) {
  const qualifiers = [];
  hand = hand.map(evaluationutils.cardToInt);
  board = board.map(evaluationutils.cardToInt);
  const score = evaluationutils.evaluate(hand, board);
  const qualifier = scoreToString(score);
  qualifiers.push(qualifier);

  const subq = getMadeHandSubqualifier(qualifier, hand, board);
  if (subq !== 'none') {
    qualifiers.push(subq);
  }

  const drawSubq = getDrawQualifiers(qualifier, hand, board);
  for (let i = 0; i < drawSubq.length; i++) {
    qualifiers.push(drawSubq[i]);
  }
  return qualifiers;
};
