import React, { useState, useEffect } from "react";
import PlayingCard from "../playing-card/playing-card";
import { PlayingCardStateProps } from "../playing-card/playing-card-props";
import { HoleCards, HoleCardsProps } from "./hole-cards-props";

const Hole = ({ holeCards, setHoleCards }: HoleCardsProps) => {
    const [card1State, setCard1State] = useState<PlayingCardStateProps>({});
    const [card2State, setCard2State] = useState<PlayingCardStateProps>({});

    const updateHoleCard = (
        cardState: PlayingCardStateProps,
        boardKey: keyof HoleCards,
    ) => {
        setHoleCards((prevHoleCards) => ({
            ...prevHoleCards,
            [boardKey]:
                cardState.rank && cardState.suit
                    ? cardState.rank + cardState.suit
                    : undefined,
        }));
    };
    useEffect(() => {
        updateHoleCard(card1State, "hole1");
    }, [card1State]);

    useEffect(() => {
        updateHoleCard(card2State, "hole2");
    }, [card2State]);

    return (
        <>
            <PlayingCard
                height={55}
                playingCardState={card1State}
                setPlayingCardState={setCard1State}
                className="ml-auto mr-[1px]"
            />
            <PlayingCard
                height={55}
                playingCardState={card2State}
                setPlayingCardState={setCard2State}
                className="ml-[1px] mr-auto"
            />
        </>
    );
};

export default Hole;
