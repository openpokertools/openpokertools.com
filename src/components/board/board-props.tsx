import type { Dispatch, SetStateAction } from "react";

import type { BoardCards } from "@/lib/models";

export type { BoardCards } from "@/lib/models";

export interface BoardProps {
  setBoardCards: Dispatch<SetStateAction<BoardCards>>;
}
