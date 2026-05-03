import React, { useEffect, useRef, useState } from "react";

import GtoWizardCta, { VARIANTS } from "../misc/gto-wizard-cta";
import PaintbrushButtonProvider from "../range/paintbrush-button-context";
import RangeLoaderProvider from "../range/range-loader-context";
import DisplayContainer from "../shell/display-container";
import PlayerDisplay from "./player-display";
import RangeEquityDisplay from "./range-equity-display";
import { createPlayer, type Player } from "./range-equity-props";

const RangeEquityTool = () => {
  const [players, setPlayers] = useState<Record<number, Player>>({
    0: createPlayer(0),
    1: createPlayer(1),
  });
  const [showCta, setShowCta] = useState(false);
  const [heroEquity, setHeroEquity] = useState<number | null>(null);
  const ctaTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [variant] = useState(() => VARIANTS[Math.floor(Math.random() * VARIANTS.length)]);

  useEffect(() => () => { if (ctaTimerRef.current) clearTimeout(ctaTimerRef.current); }, []);

  const updatePlayer = (id: number, newData: Partial<Player>) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [id]: {
        ...prevPlayers[id],
        ...newData,
      },
    }));
  };

  return (
    <>
      <DisplayContainer maxWidth="960px">
        <RangeEquityDisplay
          players={players}
          setPlayers={setPlayers}
          updatePlayer={updatePlayer}
          onSimulate={(heroWin) => {
            if (ctaTimerRef.current === null && !showCta) {
              setHeroEquity(heroWin);
              ctaTimerRef.current = setTimeout(() => setShowCta(true), variant.delay);
            }
          }}
        />
      </DisplayContainer>
      {showCta && <GtoWizardCta context="equity" variantId={variant.id} heroEquity={heroEquity} />}
      <div className="grid grid-cols-1 min-[955px]:grid-cols-2 mx-auto gap-4 max-w-[960px]">
        <RangeLoaderProvider>
          <PaintbrushButtonProvider>
            {Object.values(players).map((player) => (
              <div key={player.id} className="col-span-1">
                <PlayerDisplay player={player} updatePlayer={updatePlayer} />
              </div>
            ))}
          </PaintbrushButtonProvider>
        </RangeLoaderProvider>
      </div>
    </>
  );
};

export default RangeEquityTool;
