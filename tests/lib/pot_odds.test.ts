import { describe, expect, it } from "bun:test";
import { getPotOdds } from "@/lib/pot_odds";

describe("getPotOdds", () => {
  it("returns '∞' when equity is 0%", () => {
    expect(getPotOdds(0, 0)).toBe("∞");
  });

  it("returns '0' when equity is 100%", () => {
    expect(getPotOdds(1, 0)).toBe("0");
  });

  it("returns '1:1' at 50% win", () => {
    expect(getPotOdds(0.5, 0)).toBe("1:1");
  });

  it("returns '2:1' at ~33% win", () => {
    expect(getPotOdds(0.33, 0)).toBe("2:1");
  });

  it("returns '1:2' at ~67% win", () => {
    expect(getPotOdds(0.67, 0)).toBe("1:2");
  });

  it("counts tie as half equity", () => {
    // 0% win, 100% tie → 50% effective equity → same as 50% win
    expect(getPotOdds(0, 1)).toBe("1:1");
  });

  it("combines win and tie equity correctly", () => {
    // 25% win + 50% tie = 50% effective equity → 1:1
    expect(getPotOdds(0.25, 0.5)).toBe("1:1");
  });
});
