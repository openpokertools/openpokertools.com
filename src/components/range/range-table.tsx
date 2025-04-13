import { RANKS } from "@/lib/constants";
import React from "react";
import type { RangeSelectorProps } from "./range-props";

const RangeTable = ({ selectedHands, setSelectedHands, activeHands }: RangeSelectorProps) => {
  const toggleHandSelection = (hand: string) => {
    const newSelectedHands = new Set(selectedHands);
    if (newSelectedHands.has(hand)) {
      newSelectedHands.delete(hand);
    } else {
      newSelectedHands.add(hand);
    }
    setSelectedHands(newSelectedHands);
  };

  return (
    <table className="mx-auto range_table">
      <tbody>
        {RANKS.map((rank1, i) => (
          <tr key={i}>
            {RANKS.map((rank2, j) => {
              let hand: string;
              let handType: string;
              if (i === j) {
                hand = `${rank1}${rank2}`;
                handType = "pocketpair";
              } else if (i < j) {
                hand = `${rank1}${rank2}s`;
                handType = "suited";
              } else {
                hand = `${rank2}${rank1}o`;
                handType = "offsuit";
              }
              const isActive = activeHands?.get(hand);
              const percent = isActive ? (activeHands.get(hand) * 100) / 12 : 0;
              const style = isActive
                ? {
                    background: `linear-gradient(to right, limegreen ${percent}%, lightgreen ${percent}%)`,
                  }
                : {};

              return (
                <td
                  key={hand}
                  className={`range_cell ${handType} ${selectedHands.has(hand) ? "selected" : ""}`}
                  onMouseDown={() => toggleHandSelection(hand)}
                  style={style}
                >
                  {hand}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RangeTable;
