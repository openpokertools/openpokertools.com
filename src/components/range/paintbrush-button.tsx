import React, { useState } from "react";

import { Paintbrush } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { COLORS } from "@/lib/constants";
import { cn, suitToColor } from "@/lib/utils";

import { SUIT_SVGS } from "../playing-card/playing-card-svgs";

interface ColorSelectorProps {
  color: keyof typeof COLORS;
}
const ColorSelector = ({ color }: ColorSelectorProps) => {
  return (
    <Button
      className="rounded-full w-5 h-5 p-0 mx-auto"
      style={{ backgroundColor: COLORS[color][1] }}
    ></Button>
  );
};

interface SuitSelectorProps {
  suit: string;
}
const SuitSelector = ({ suit }: SuitSelectorProps) => {
  return (
    <Button
      className={cn(
        "w-[1.62rem] h-[1.62rem] p-0 bg-transparent hover:bg-accent",
        "inline-block align-middle text-md border",
      )}
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
    </Button>
  );
};

interface PaintbrushButtonProps {
  className: string;
}
const PaintbrushButton = ({ className }: PaintbrushButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className={cn("bg-sky-500 hover:bg-sky-600", className)}>
          <span>
            <Paintbrush />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-1">
        <div className="grid gap-[0.2rem]">
          <div className="flex flex-row gap-[inherit] my-1">
            <ColorSelector color="purple" />
            <ColorSelector color="blue" />
            <ColorSelector color="green" />
            <ColorSelector color="yellow" />
            <ColorSelector color="red" />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector suit="xx" />
            <SuitSelector suit="xs" />
            <SuitSelector suit="xh" />
            <SuitSelector suit="xc" />
            <SuitSelector suit="xd" />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector suit="sx" />
            <SuitSelector suit="ss" />
            <SuitSelector suit="sh" />
            <SuitSelector suit="sc" />
            <SuitSelector suit="sd" />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector suit="hx" />
            <SuitSelector suit="hs" />
            <SuitSelector suit="hh" />
            <SuitSelector suit="hc" />
            <SuitSelector suit="hd" />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector suit="cx" />
            <SuitSelector suit="cs" />
            <SuitSelector suit="ch" />
            <SuitSelector suit="cc" />
            <SuitSelector suit="cd" />
          </div>
          <div className="flex flex-row gap-[inherit]">
            <SuitSelector suit="dx" />
            <SuitSelector suit="ds" />
            <SuitSelector suit="dh" />
            <SuitSelector suit="dc" />
            <SuitSelector suit="dd" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PaintbrushButton;
