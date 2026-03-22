import { describe, expect, it } from "bun:test";
import { qualifyCards } from "@/lib/descriptor_utils";
import type { Card, Combo } from "@/lib/models";

const combo = (c1: string, c2: string): Combo => [c1 as Card, c2 as Card];
const board = (...cards: string[]): Card[] => cards as Card[];

describe("qualifyCards — made hands", () => {
  it("identifies a straight flush (royal flush)", () => {
    const qs = qualifyCards(combo("As", "Ks"), board("Qs", "Js", "Ts"));
    expect(qs).toContain("straightflush");
  });

  it("identifies quads", () => {
    const qs = qualifyCards(combo("Ah", "As"), board("Ac", "Ad", "Kh"));
    expect(qs).toContain("quads");
  });

  it("identifies a full house", () => {
    const qs = qualifyCards(combo("Ah", "As"), board("Ac", "Kd", "Kh"));
    expect(qs).toContain("fullhouse");
  });

  it("identifies a flush", () => {
    const qs = qualifyCards(combo("As", "2s"), board("Ks", "Qs", "3s"));
    expect(qs).toContain("flush");
  });

  it("identifies a straight", () => {
    const qs = qualifyCards(combo("As", "2c"), board("3d", "4h", "5s"));
    expect(qs).toContain("straight");
  });

  it("identifies trips and set (pocket pair hitting the board)", () => {
    const qs = qualifyCards(combo("Ah", "As"), board("Ac", "Kd", "2h"));
    expect(qs).toContain("trips");
    expect(qs).toContain("set");
  });

  it("identifies two pair", () => {
    const qs = qualifyCards(combo("Ah", "Kh"), board("As", "Kd", "2c"));
    expect(qs).toContain("twopair");
  });

  it("identifies top pair", () => {
    const qs = qualifyCards(combo("Ah", "2c"), board("As", "7d", "3h"));
    expect(qs).toContain("pair");
    expect(qs).toContain("toppair");
  });

  it("identifies second pair", () => {
    // Board: A 7 3 — pair the 7
    const qs = qualifyCards(combo("7h", "2c"), board("As", "7d", "3h"));
    expect(qs).toContain("pair");
    expect(qs).toContain("secondpair");
  });

  it("identifies weak pair", () => {
    // Board: A K 7 — pair the 3 (two cards above it on board)
    const qs = qualifyCards(combo("3h", "3c"), board("As", "Kd", "7h"));
    expect(qs).toContain("pair");
    expect(qs).toContain("weakpair");
  });

  it("identifies overpair (pocket pair above all board cards)", () => {
    const qs = qualifyCards(combo("Ah", "As"), board("Kd", "7h", "2c"));
    expect(qs).toContain("pair");
    expect(qs).toContain("overpair");
  });

  it("identifies high card ace-high", () => {
    const qs = qualifyCards(combo("Ah", "2c"), board("Ks", "7d", "3h"));
    expect(qs).toContain("highcard");
    expect(qs).toContain("acehigh");
  });
});

describe("qualifyCards — exact output", () => {
  it("ace-high with flush draw and gutshot", () => {
    expect(qualifyCards(combo("As", "2s"), board("Kh", "3s", "4s"))).toEqual([
      "highcard", "acehigh", "flushdraw", "flushdraw_gutshot", "gutshot",
    ]);
  });

  it("overpair with backdoor flush draw and overcards", () => {
    expect(qualifyCards(combo("As", "Ah"), board("Kh", "3s", "4s"))).toEqual([
      "pair", "overpair", "backdoorflushdraw", "overcards",
    ]);
  });

  it("flush with OESD", () => {
    expect(qualifyCards(combo("5s", "6s"), board("Ks", "3s", "4s"))).toEqual([
      "flush", "oesd",
    ]);
  });
});

describe("qualifyCards — draws", () => {
  it("identifies flush draw (4 cards to a flush)", () => {
    const qs = qualifyCards(combo("Ah", "2h"), board("Kh", "Qh", "7c"));
    expect(qs).toContain("flushdraw");
  });

  it("identifies backdoor flush draw (3 cards to a flush)", () => {
    const qs = qualifyCards(combo("Ah", "2h"), board("Kh", "Qc", "7d"));
    expect(qs).toContain("backdoorflushdraw");
  });

  it("identifies OESD", () => {
    // 5 6 7 8 — open-ended
    const qs = qualifyCards(combo("5c", "6d"), board("7h", "8s", "Ac"));
    expect(qs).toContain("oesd");
  });

  it("identifies gutshot", () => {
    // 5 6 8 9 — needs a 7
    const qs = qualifyCards(combo("5c", "6d"), board("8h", "9s", "Ac"));
    expect(qs).toContain("gutshot");
  });

  it("identifies overcards", () => {
    // Hole cards A K both above board 9 7 3
    const qs = qualifyCards(combo("Ah", "Kc"), board("9s", "7d", "3h"));
    expect(qs).toContain("overcards");
  });
});
