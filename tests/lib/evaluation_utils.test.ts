import { describe, expect, it } from "bun:test";
import { cardToInt, combinations, evaluate, findWinners, getRankInt, getSuitInt } from "@/lib/evaluation_utils";

describe("cardToInt", () => {
  it("produces distinct integers for every card", () => {
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
    const suits = ["s", "h", "d", "c"];
    const seen = new Set<number>();
    for (const r of ranks) {
      for (const s of suits) {
        const n = cardToInt(`${r}${s}` as any);
        expect(seen.has(n)).toBe(false);
        seen.add(n);
      }
    }
    expect(seen.size).toBe(52);
  });

  it("getRankInt round-trips rank position", () => {
    // Ace = rank 12, Two = rank 0
    expect(getRankInt(cardToInt("As" as any))).toBe(12);
    expect(getRankInt(cardToInt("2s" as any))).toBe(0);
    expect(getRankInt(cardToInt("Ks" as any))).toBe(11);
  });

  it("getSuitInt returns distinct values per suit", () => {
    const suits = (["s", "h", "d", "c"] as const).map((s) =>
      getSuitInt(cardToInt(`As` as any)),
    );
    // All spades → same suit int
    const spade = getSuitInt(cardToInt("As" as any));
    const heart = getSuitInt(cardToInt("Ah" as any));
    const diamond = getSuitInt(cardToInt("Ad" as any));
    const club = getSuitInt(cardToInt("Ac" as any));
    const suitInts = new Set([spade, heart, diamond, club]);
    expect(suitInts.size).toBe(4);
  });
});

describe("combinations", () => {
  it("returns empty array when k > n", () => {
    expect(combinations([1, 2], 3)).toEqual([]);
  });

  it("returns empty array when k is 0", () => {
    expect(combinations([1, 2, 3], 0)).toEqual([]);
  });

  it("C(3,2) = 3", () => {
    expect(combinations([1, 2, 3], 2)).toHaveLength(3);
  });

  it("C(4,2) = 6", () => {
    expect(combinations([1, 2, 3, 4], 2)).toHaveLength(6);
  });

  it("C(5,3) = 10", () => {
    expect(combinations([1, 2, 3, 4, 5], 3)).toHaveLength(10);
  });

  it("each combination has the correct length", () => {
    for (const comb of combinations([1, 2, 3, 4], 3)) {
      expect(comb).toHaveLength(3);
    }
  });
});

describe("evaluate", () => {
  const c = (card: string) => cardToInt(card as any);

  it("royal flush scores better than any other hand (score = 1)", () => {
    const score = evaluate([c("As"), c("Ks")], [c("Qs"), c("Js"), c("Ts")]);
    expect(score).toBe(1);
  });

  it("high card scores in the high card range (> 6185)", () => {
    // 2c 4d 6h 8s Td — all different ranks and suits, no draws
    const score = evaluate([c("2c"), c("4d")], [c("6h"), c("8s"), c("Ts")]);
    expect(score).toBeGreaterThan(6185);
    expect(score).toBeLessThanOrEqual(7462);
  });

  it("flush beats straight (lower score = better)", () => {
    const flush = evaluate([c("As"), c("2s")], [c("5s"), c("7s"), c("9s")]);
    const straight = evaluate([c("As"), c("2c")], [c("3d"), c("4h"), c("5s")]);
    expect(flush).toBeLessThan(straight);
  });

  it("full house beats flush", () => {
    const fullHouse = evaluate([c("Ah"), c("As")], [c("Ac"), c("Kd"), c("Kh")]);
    const flush = evaluate([c("As"), c("2s")], [c("5s"), c("7s"), c("9s")]);
    expect(fullHouse).toBeLessThan(flush);
  });
});

describe("findWinners", () => {
  it("returns the single lowest score index", () => {
    expect(findWinners([100, 200, 50])).toEqual([2]);
  });

  it("returns all tied indices on a split", () => {
    expect(findWinners([100, 100, 200])).toEqual([0, 1]);
  });

  it("handles a three-way tie", () => {
    expect(findWinners([50, 50, 50])).toEqual([0, 1, 2]);
  });
});
