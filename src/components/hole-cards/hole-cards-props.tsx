export interface HoleCardsProps {
    holeCards: HoleCards;
    setHoleCards: (holeCards: HoleCards) => void;
}

export interface HoleCards {
    hole1?: string;
    hole2?: string;
}
