import React from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { COLORS } from "@/lib/constants";
import { toggleHandColor, toggleHandSuits } from "@/lib/hand_modifiers";
import { isSuitSelected } from "@/lib/suit_utils";
import { cn, handType, suitToColor } from "@/lib/utils";

import { SUIT_SVGS } from "../playing-card/playing-card-svgs";
import { useRangeSelectorContext } from "./range-context";

interface ColorSelectorProps {
  hand: string;
  color: keyof typeof COLORS;
}
const ColorSelector = ({ hand, color }: ColorSelectorProps) => {
  const { setHandModifiers } = useRangeSelectorContext();
  const handleColorSelectorClick = () => {
    setHandModifiers((prev) => {
      return toggleHandColor(hand, prev, color);
    });
  };

  return (
    <ContextMenuItem
      className="w-5 h-5 rounded-full p-0 mx-auto cursor-pointer"
      style={{ backgroundColor: COLORS[color][1] }}
      onMouseDown={handleColorSelectorClick}
    />
  );
};

interface SuitSelectorProps {
  hand: string;
  suit: string;
  isActive: boolean;
}
const SuitSelector = ({ hand, suit, isActive }: SuitSelectorProps) => {
  const { handModifiers, setHandModifiers } = useRangeSelectorContext();
  const modifier = handModifiers.get(hand) ?? {};
  const suits = modifier.suits || [];
  const handleSuitSelectorClick = () => {
    if (!isActive) {
      return;
    }
    setHandModifiers((prev) => {
      return toggleHandSuits(hand, prev, suit);
    });
  };

  const selected = isSuitSelected(hand, suit, suits);

  return (
    <ContextMenuItem
      className={cn(
        "w-[1.62rem] h-[1.62rem] p-0",
        "inline-block align-middle text-md border",
        selected ? "bg-green-300 focus:bg-green-400" : "",
        isActive ? "cursor-pointer" : "cursor-not-allowed bg-gray-300 opacity-20",
      )}
      onMouseDown={handleSuitSelectorClick}
    >
      <div className="grid text-[0.75rem] h-full">
        <div className="flex flex-row my-auto">
          <span className="-ml-[0.05rem]" style={{ fill: suitToColor(suit[0], true) }}>
            {SUIT_SVGS[suit[0]]}
          </span>
          <span className="-ml-[0.25rem]" style={{ fill: suitToColor(suit[1], true) }}>
            {SUIT_SVGS[suit[1]]}
          </span>
        </div>
      </div>
    </ContextMenuItem>
  );
};

const RangeCell = ({ hand }: { hand: string }) => {
  const handleContextMenuContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  const handT = handType(hand);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="inline-flex items-center justify-center h-full w-full">
        {hand}
      </ContextMenuTrigger>
      <ContextMenuContent className="min-w-[0px] p-2" onMouseDown={handleContextMenuContentClick}>
        <div className="grid gap-[0.2rem]">
          <div className="flex flex-row gap-[inherit] my-1">
            <ColorSelector hand={hand} color="purple" />
            <ColorSelector hand={hand} color="blue" />
            <ColorSelector hand={hand} color="green" />
            <ColorSelector hand={hand} color="yellow" />
            <ColorSelector hand={hand} color="red" />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector hand={hand} suit="xx" isActive={true} />
            <SuitSelector hand={hand} suit="xs" isActive={handT === "offsuit"} />
            <SuitSelector hand={hand} suit="xh" isActive={handT === "offsuit"} />
            <SuitSelector hand={hand} suit="xc" isActive={handT === "offsuit"} />
            <SuitSelector hand={hand} suit="xd" isActive={handT === "offsuit"} />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector
              hand={hand}
              suit="sx"
              isActive={handT === "offsuit" || handT === "pocketpair"}
            />
            <SuitSelector hand={hand} suit="ss" isActive={handT === "suited"} />
            <SuitSelector hand={hand} suit="sh" isActive={handT === "offsuit"} />
            <SuitSelector hand={hand} suit="sc" isActive={handT === "offsuit"} />
            <SuitSelector hand={hand} suit="sd" isActive={handT === "offsuit"} />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector
              hand={hand}
              suit="hx"
              isActive={handT === "offsuit" || handT === "pocketpair"}
            />
            <SuitSelector
              hand={hand}
              suit="hs"
              isActive={handT === "offsuit" || handT === "pocketpair"}
            />
            <SuitSelector hand={hand} suit="hh" isActive={handT === "suited"} />
            <SuitSelector hand={hand} suit="hc" isActive={handT === "offsuit"} />
            <SuitSelector hand={hand} suit="hd" isActive={handT === "offsuit"} />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector
              hand={hand}
              suit="cx"
              isActive={handT === "offsuit" || handT === "pocketpair"}
            />
            <SuitSelector
              hand={hand}
              suit="cs"
              isActive={handT === "offsuit" || handT === "pocketpair"}
            />
            <SuitSelector
              hand={hand}
              suit="ch"
              isActive={handT === "offsuit" || handT === "pocketpair"}
            />
            <SuitSelector hand={hand} suit="cc" isActive={handT === "suited"} />
            <SuitSelector hand={hand} suit="cd" isActive={handT === "offsuit"} />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector
              hand={hand}
              suit="dx"
              isActive={handT === "offsuit" || handT === "pocketpair"}
            />
            <SuitSelector
              hand={hand}
              suit="ds"
              isActive={handT === "offsuit" || handT === "pocketpair"}
            />
            <SuitSelector
              hand={hand}
              suit="dh"
              isActive={handT === "offsuit" || handT === "pocketpair"}
            />
            <SuitSelector
              hand={hand}
              suit="dc"
              isActive={handT === "offsuit" || handT === "pocketpair"}
            />
            <SuitSelector hand={hand} suit="dd" isActive={handT === "suited"} />
          </div>
        </div>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default RangeCell;
