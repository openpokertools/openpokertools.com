import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Hand } from "./models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function suitToColor(suit: string, fourColor: boolean = false) {
  if (!fourColor) {
    switch (suit) {
      case "h":
      case "d":
        return "red";
      default:
        return "black";
    }
  } else {
    switch (suit) {
      case "h":
        return "red";
      case "d":
        return "blue";
      case "c":
        return "green";
      default:
        return "black";
    }
  }
}

export function handType(hand: Hand) {
  if (hand.length === 2) {
    return "pocketpair";
  } else if (hand[2] === "s") {
    return "suited";
  } else {
    return "offsuit";
  }
}
