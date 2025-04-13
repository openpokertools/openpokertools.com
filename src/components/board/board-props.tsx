import type { Dispatch, SetStateAction } from "react";

export interface BoardProps {
  setBoardCards: Dispatch<SetStateAction<BoardCards>>;
}

export interface BoardCards {
  flop1?: string;
  flop2?: string;
  flop3?: string;
  turn?: string;
  river?: string;
}
