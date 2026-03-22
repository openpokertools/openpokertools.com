import { describe, expect, it } from "bun:test";
import { handsToCombos } from "@/lib/range_utils";

describe("handsToCombos", () => {
  describe("combo counts (no modifiers)", () => {
    it("generates 6 combos for a pocket pair", () => {
      expect(handsToCombos(new Set(["AA"]), new Map()).size).toBe(6);
    });

    it("generates 4 combos for a suited hand", () => {
      expect(handsToCombos(new Set(["AKs"]), new Map()).size).toBe(4);
    });

    it("generates 12 combos for an offsuit hand", () => {
      expect(handsToCombos(new Set(["AKo"]), new Map()).size).toBe(12);
    });

    it("accumulates combos across multiple hands", () => {
      // AA (6) + AKs (4) + AKo (12) = 22
      const combos = handsToCombos(new Set(["AA", "AKs", "AKo"]), new Map());
      expect(combos.size).toBe(22);
    });
  });

  describe("combo structure", () => {
    it("pocket pair combos are always two different suits", () => {
      const combos = handsToCombos(new Set(["AA"]), new Map());
      for (const [c1, c2] of combos) {
        expect(c1[0]).toBe("A");
        expect(c2[0]).toBe("A");
        expect(c1[1]).not.toBe(c2[1]); // different suits
      }
    });

    it("suited combos always share the same suit", () => {
      const combos = handsToCombos(new Set(["AKs"]), new Map());
      for (const [c1, c2] of combos) {
        expect(c1[1]).toBe(c2[1]); // same suit
      }
    });

    it("offsuit combos never share the same suit", () => {
      const combos = handsToCombos(new Set(["AKo"]), new Map());
      for (const [c1, c2] of combos) {
        expect(c1[1]).not.toBe(c2[1]); // different suits
      }
    });
  });

  describe("suit annotations", () => {
    it("specific suit annotation reduces combos", () => {
      // Only AhKh — 1 combo
      const modifiers = new Map([["AKs", { suits: ["hh"] }]]);
      const combos = handsToCombos(new Set(["AKs"]), modifiers as any);
      expect(combos.size).toBe(1);
    });

    it("wildcard annotation on suited hand includes 4 suits", () => {
      // ss, hh, dd, cc → 4 combos
      const modifiers = new Map([["AKs", { suits: ["ss", "hh", "dd", "cc"] }]]);
      const combos = handsToCombos(new Set(["AKs"]), modifiers as any);
      expect(combos.size).toBe(4);
    });
  });
});
