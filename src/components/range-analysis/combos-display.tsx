import React from "react";

import { SUITS_TO_HTML } from "@/lib/constants";
import type { Suit } from "@/lib/models";
import { suitToColor } from "@/lib/utils";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface CardStringProps {
  card: string;
}

const CardString = ({ card }: CardStringProps) => {
  return (
    <span style={{ color: suitToColor(card[1]) }}>{card[0] + SUITS_TO_HTML[card[1] as Suit]}</span>
  );
};

interface ComboStringProps {
  combo: [string, string];
}

const ComboString = ({ combo }: ComboStringProps) => {
  return (
    <>
      <CardString card={combo[0]} />
      <CardString card={combo[1]} />
    </>
  );
};

interface CombosStringProps {
  combos: Array<[string, string]>;
}

const CombosString = ({ combos }: CombosStringProps) => {
  return (
    <>
      {combos.map((combo, index) => (
        <React.Fragment key={index}>
          <ComboString combo={combo} />
          {index < combos.length - 1 && ", "}
        </React.Fragment>
      ))}
    </>
  );
};

interface CombosDisplayProps {
  keptToTurn: Array<[string, string]>;
  keptToRiver: Array<[string, string]>;
  keptToShowdown: Array<[string, string]>;
}

const CombosDisplay = ({ keptToTurn, keptToRiver, keptToShowdown }: CombosDisplayProps) => {
  return (
    <div className="col-12 p-3">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="Combos kept to turn">
          <AccordionTrigger>Combos kept to turn</AccordionTrigger>
          <AccordionContent>
            <CombosString combos={keptToTurn} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Combos kept to river">
          <AccordionTrigger>Combos kept to river</AccordionTrigger>
          <AccordionContent>
            <CombosString combos={keptToRiver} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Combos kept to showdown">
          <AccordionTrigger>Combos kept to showdown</AccordionTrigger>
          <AccordionContent>
            <CombosString combos={keptToShowdown} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CombosDisplay;
