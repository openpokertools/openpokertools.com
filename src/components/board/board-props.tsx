import type { Dispatch, SetStateAction } from "react";

import type { Card } from "@/lib/models";

export interface BoardProps {
  setBoardCards: Dispatch<SetStateAction<BoardCards>>;
}

export interface BoardCards {
  flop1?: Card;
  flop2?: Card;
  flop3?: Card;
  turn?: Card;
  river?: Card;
}
