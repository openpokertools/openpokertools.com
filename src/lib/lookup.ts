const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];

const MAX_STRAIGHT_FLUSH = 10;
const MAX_FOUR_OF_A_KIND = 166;
const MAX_FULL_HOUSE = 322;
const MAX_FLUSH = 1599;
const MAX_STRAIGHT = 1609;
const MAX_THREE_OF_A_KIND = 2467;
const MAX_TWO_PAIR = 3325;
const MAX_PAIR = 6185;

export const FLUSH_LOOKUP: Map<number, number> = new Map();
export const UNSUITED_LOOKUP: Map<number, number> = new Map();

function flushes(): void {
  const straightFlushes = [7936, 3968, 1984, 992, 496, 248, 124, 62, 31, 4111];
  const flushes: number[] = [];
  const gen = getLexicographicallyNextBitSequence(31);

  for (let i = 0; i < 1286; i++) {
    const f = gen.next().value;
    let notSF = true;
    for (const sf of straightFlushes) {
      if (!(f ^ sf)) {
        notSF = false;
      }
    }

    if (notSF) {
      flushes.push(f);
    }
  }

  let rank = 1;
  for (const sf of straightFlushes) {
    const primeProduct = primeProductFromRankbits(sf);
    FLUSH_LOOKUP.set(primeProduct, rank);
    rank += 1;
  }

  rank = MAX_FULL_HOUSE + 1;
  for (let i = flushes.length - 1; i >= 0; i--) {
    const primeProduct = primeProductFromRankbits(flushes[i]);
    FLUSH_LOOKUP.set(primeProduct, rank);
    rank += 1;
  }
  straightAndHighcards(straightFlushes, flushes);
}

function straightAndHighcards(straights: number[], highcards: number[]): void {
  let rank = MAX_FLUSH + 1;

  for (const s of straights) {
    const primeProduct = primeProductFromRankbits(s);
    UNSUITED_LOOKUP.set(primeProduct, rank);
    rank += 1;
  }

  rank = MAX_PAIR + 1;
  for (let i = highcards.length - 1; i >= 0; i--) {
    const primeProduct = primeProductFromRankbits(highcards[i]);
    UNSUITED_LOOKUP.set(primeProduct, rank);
    rank += 1;
  }
}

function multiples(): void {
  const backwardsRanks = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  let rank = MAX_STRAIGHT_FLUSH + 1;
  for (const i of backwardsRanks) {
    const kickers = [...backwardsRanks];
    removeItem(kickers, i);
    for (const k of kickers) {
      const product = PRIMES[i] ** 4 * PRIMES[k];
      UNSUITED_LOOKUP.set(product, rank);
      rank += 1;
    }
  }

  rank = MAX_FOUR_OF_A_KIND + 1;
  for (const i of backwardsRanks) {
    const pairranks = [...backwardsRanks];
    removeItem(pairranks, i);
    for (const pr of pairranks) {
      const product = PRIMES[i] ** 3 * PRIMES[pr] ** 2;
      UNSUITED_LOOKUP.set(product, rank);
      rank += 1;
    }
  }

  rank = MAX_STRAIGHT + 1;
  for (const r of backwardsRanks) {
    const kickers = [...backwardsRanks];
    removeItem(kickers, r);
    const gen = combinations(kickers, 2);

    for (const kickers of gen) {
      const c1 = kickers[0];
      const c2 = kickers[1];
      const product = PRIMES[r] ** 3 * PRIMES[c1] * PRIMES[c2];
      UNSUITED_LOOKUP.set(product, rank);
      rank += 1;
    }
  }

  rank = MAX_THREE_OF_A_KIND + 1;
  const tpgen = combinations(backwardsRanks, 2);
  for (const tp of tpgen) {
    const pair1 = tp[0];
    const pair2 = tp[1];
    const kickers = [...backwardsRanks];
    removeItem(kickers, pair1);
    removeItem(kickers, pair2);
    for (const kicker of kickers) {
      const product = PRIMES[pair1] ** 2 * PRIMES[pair2] ** 2 * PRIMES[kicker];
      UNSUITED_LOOKUP.set(product, rank);
      rank += 1;
    }
  }

  rank = MAX_TWO_PAIR + 1;
  for (const pairrank of backwardsRanks) {
    const kickers = [...backwardsRanks];
    removeItem(kickers, pairrank);
    const kgen = combinations(kickers, 3);

    for (const k of kgen) {
      const k1 = k[0];
      const k2 = k[1];
      const k3 = k[2];
      const product = PRIMES[pairrank] ** 2 * PRIMES[k1] * PRIMES[k2] * PRIMES[k3];
      UNSUITED_LOOKUP.set(product, rank);
      rank += 1;
    }
  }
}

function* getLexicographicallyNextBitSequence(bits: number): Generator<number> {
  let t = (bits | (bits - 1)) + 1;
  let next = t | ((Math.floor((t & -t) / (bits & -bits)) >> 1) - 1);
  yield next;
  while (true) {
    t = (next | (next - 1)) + 1;
    next = t | ((Math.floor((t & -t) / (next & -next)) >> 1) - 1);
    yield next;
  }
}

function removeItem<T>(array: T[], item: T): void {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
}

function combinations<T>(elements: T[], k: number): T[][] {
  if (k > elements.length || k === 0) {
    return [];
  }

  const indices: number[] = [];
  for (let i = k - 1; i >= 0; i--) {
    indices.push(i);
  }

  const combs: T[][] = [];
  while (true) {
    const comb: T[] = [];

    for (const ind of indices) {
      comb.push(elements[ind]);
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
}

function primeProductFromRankbits(rankbits: number): number {
  let product = 1;
  for (let i = 0; i <= 12; i++) {
    if (rankbits & (1 << i)) {
      product *= PRIMES[i];
    }
  }
  return product;
}

flushes();
multiples();
