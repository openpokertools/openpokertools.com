import React from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { COLORS } from "@/lib/constants";

import { useRangeSelectorContext } from "./range-context";

interface ColorSelectorProps {
  hand: string;
  color: string;
}
const ColorSelector = ({ hand, color }: ColorSelectorProps) => {
  const { setHandModifiers } = useRangeSelectorContext();
  const handleColorSelectorClick = () => {
    setHandModifiers((prev) => {
      const next = new Map(prev);
      const modifier = next.get(hand) ?? {};
      next.set(hand, { ...modifier, color });
      return next;
    });
  };

  return (
    <ContextMenuItem
      className=" w-5 h-5 p-0 mx-[0.15rem] my-0 inline-block cursor-pointer align-middle"
      onMouseDown={handleColorSelectorClick}
    >
      <div
        className="rounded-full shadow-lg w-4 h-4 mx-auto"
        style={{ backgroundColor: COLORS[color][1] }}
      ></div>
    </ContextMenuItem>
  );
};

const RangeCell = ({ hand }: { hand: string }) => {
  const handleContextMenuContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="inline-flex items-center justify-center h-full w-full">
        {hand}
      </ContextMenuTrigger>
      <ContextMenuContent className="min-w-[0px] p-1" onMouseDown={handleContextMenuContentClick}>
        <ColorSelector hand={hand} color="purple" />
        <ColorSelector hand={hand} color="blue" />
        <ColorSelector hand={hand} color="green" />
        <ColorSelector hand={hand} color="yellow" />
        <ColorSelector hand={hand} color="red" />
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default RangeCell;
