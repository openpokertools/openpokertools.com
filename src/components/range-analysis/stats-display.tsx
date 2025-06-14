import React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  METERS,
  QUALIFIER_DISPLAY,
  QUALIFIERS,
  ROUNDS,
  ROUNDS_DISPLAY,
  SUBQUALIFIERS,
} from "@/lib/constants";
import type { PostFlopRound, Qualifier, Round } from "@/lib/models";

import type { SelectedQualifiers } from "./stats-display-props";

export interface StatsProps {
  stats: Map<Round, Map<Qualifier, number>>;
  selectedQualifiers: SelectedQualifiers;
  setSelectedQualifiers: (updatedQualifiers: SelectedQualifiers) => void;
  setSelectedTab: (tab: Round) => void;
}
const StatsDisplay = ({
  stats,
  selectedQualifiers,
  setSelectedQualifiers,
  setSelectedTab,
}: StatsProps) => {
  const updateSelectedQualifiers = (round: PostFlopRound, qualifier: Qualifier, value: boolean) => {
    const updatedQualifiers = {
      ...selectedQualifiers,
      [round]: {
        ...selectedQualifiers[round],
        [qualifier]: value,
      },
    };
    setSelectedQualifiers(updatedQualifiers);
  };

  const updateMultipleQualifiers = (
    round: PostFlopRound,
    qualifiers: Array<Qualifier>,
    value: boolean,
  ) => {
    const roundQualifiers = selectedQualifiers[round];
    for (const q of qualifiers) {
      roundQualifiers[q] = value;
    }
    const updatedQualifiers = {
      ...selectedQualifiers,
      [round]: roundQualifiers,
    };
    setSelectedQualifiers(updatedQualifiers);
  };

  const updateSelectedTab = (value: Round) => {
    setSelectedTab(value);
  };

  const setAllMade = (round: PostFlopRound, value: boolean) => {
    const roundQualifiers = selectedQualifiers[round];
    for (const q of METERS) {
      if (q === "flushdraw") {
        break;
      }
      roundQualifiers[q] = value;
    }
    const updatedQualifiers = {
      ...selectedQualifiers,
      [round]: roundQualifiers,
    };
    setSelectedQualifiers(updatedQualifiers);
  };

  const setAllDraws = (round: PostFlopRound, value: boolean) => {
    const roundQualifiers = selectedQualifiers[round];
    let inDraws = false;
    for (const q of METERS) {
      if (q === "flushdraw") {
        inDraws = true;
      }
      if (!inDraws) {
        continue;
      }
      roundQualifiers[q] = value;
    }
    const updatedQualifiers = {
      ...selectedQualifiers,
      [round]: roundQualifiers,
    };
    setSelectedQualifiers(updatedQualifiers);
  };

  return (
    <Tabs defaultValue="preflop" className="w-full" onValueChange={updateSelectedTab}>
      <TabsList className="grid w-full grid-cols-4">
        {ROUNDS.map((round) => (
          <TabsTrigger key={`${round}-tab`} value={round}>
            {ROUNDS_DISPLAY[round]}
          </TabsTrigger>
        ))}
      </TabsList>
      {ROUNDS.map((round) => {
        const roundStats = stats.get(round) || new Map();
        return (
          <TabsContent key={`${round}-content`} value={round}>
            <Table className="stats_table">
              <TableBody>
                {QUALIFIERS.map((q) => {
                  return (
                    <React.Fragment key={`${round}-content-fragment-${q}`}>
                      {q === "straightflush" && (
                        <TableRow key={`${round}-content-madehands`}>
                          <TableCell className="p-0" colSpan={4}>
                            <i className="mr-1">Made Hands</i>
                            {round !== "preflop" && (
                              <span className="text-gray-600 text-xs font-light">
                                (
                                <Button
                                  onClick={() => setAllMade(round, true)}
                                  className="text-gray-600 text-xs font-light h-fit m-0 p-0"
                                  variant="link"
                                >
                                  select
                                </Button>
                                /
                                <Button
                                  onClick={() => setAllMade(round, false)}
                                  className="text-gray-600 text-xs font-light h-fit m-0 p-0"
                                  variant="link"
                                >
                                  unselect
                                </Button>
                                )
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                      {q === "flushdraw" && (
                        <TableRow key={`${round}-content-draws`}>
                          <TableCell className="p-0" colSpan={4}>
                            <i className="mr-1">Draws</i>
                            {round !== "preflop" && (
                              <span className="text-gray-600 text-xs font-light">
                                (
                                <Button
                                  onClick={() => setAllDraws(round, true)}
                                  className="text-gray-600 text-xs font-light h-fit m-0 p-0"
                                  variant="link"
                                >
                                  select
                                </Button>
                                /
                                <Button
                                  onClick={() => setAllDraws(round, false)}
                                  className="text-gray-600 text-xs font-light h-fit m-0 p-0"
                                  variant="link"
                                >
                                  unselect
                                </Button>
                                )
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow key={`${round}-content-${q}`}>
                        <TableCell className="stats_hand_check">
                          {round !== "preflop" && (
                            <Checkbox
                              className="translate-y-[1.5px]"
                              checked={selectedQualifiers[round][q]}
                              onCheckedChange={(isChecked) => {
                                if (isChecked) {
                                  updateMultipleQualifiers(
                                    round,
                                    [q].concat(SUBQUALIFIERS[q] || []),
                                    isChecked,
                                  );
                                } else {
                                  updateSelectedQualifiers(round, q, isChecked);
                                }
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell className="stats_hand_qualifier">
                          {QUALIFIER_DISPLAY[q]}
                        </TableCell>
                        <TableCell className="stats_hand_percent">
                          {((roundStats.get(q) || 0) * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell className="stats_hand_meter">
                          <Progress value={(roundStats.get(q) || 0) * 100} />
                        </TableCell>
                      </TableRow>
                      {SUBQUALIFIERS[q]?.map((sq) => {
                        return (
                          <TableRow key={`${round}-content-${sq}`} className="subqualifier">
                            <TableCell className="stats_hand_check" />
                            <TableCell className="stats_hand_qualifier">
                              {round !== "preflop" && (
                                <Checkbox
                                  id={`${QUALIFIER_DISPLAY[sq]}-checkbox`}
                                  className="translate-y-[2.4px]"
                                  checked={selectedQualifiers[round][sq]}
                                  onCheckedChange={(isChecked) => {
                                    if (!isChecked) {
                                      updateMultipleQualifiers(round, [q, sq], isChecked);
                                    } else {
                                      updateSelectedQualifiers(round, sq, isChecked);
                                    }
                                  }}
                                />
                              )}

                              <span className="ml-1">{QUALIFIER_DISPLAY[sq]}</span>
                            </TableCell>
                            <TableCell className="stats_hand_percent">
                              {((roundStats.get(sq) || 0) * 100).toFixed(1)}%
                            </TableCell>
                            <TableCell className="stats_hand_meter">
                              <Progress value={(roundStats.get(sq) || 0) * 100} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default StatsDisplay;
