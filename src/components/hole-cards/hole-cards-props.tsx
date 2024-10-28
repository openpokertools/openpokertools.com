import { Dispatch, SetStateAction } from "react";

export interface HoleCardsProps {
    holeCards: HoleCards;
    setHoleCards: Dispatch<SetStateAction<HoleCards>>;
}

export interface HoleCards {
    hole1?: string;
    hole2?: string;
}
