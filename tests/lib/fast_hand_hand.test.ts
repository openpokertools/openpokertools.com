import { describe, expect, it } from "bun:test";
import { calculateHandHandEquities } from "@/lib/fast_hand_hand";


describe('calculateHandHandEquities', () => {
  it("calculates the correct equity #1", () => {
    const hands = [['Ks', 'Th'], ['8d', '6h']];
    expect(calculateHandHandEquities(hands, [])).toEqual(
      [[1097019, 604784], [10501, 10501], 1712304]);
  });

  it("calculates the correct equity #2", () => {
    const hands = [['2d', 'Th'], ['Jc', '6h'], ['Ah', 'Qh']];
    expect(calculateHandHandEquities(hands, [])).toEqual(
      [[308193, 359412, 697250], [5899, 5899, 5899], 1370754]);
  });

});
