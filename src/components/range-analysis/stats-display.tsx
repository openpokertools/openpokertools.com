import React from "react";
import {
  QUALIFIERS,
  QUALIFIER_DISPLAY,
  SUBQUALIFIERS,
  ROUNDS,
  ROUNDS_DISPLAY,
} from "@/lib/constants";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelectedQualifiers } from "./stats-display-props";

export interface StatsProps {
  stats: Map<string, Map<string, number>>;
  selectedQualifiers: SelectedQualifiers;
  setSelectedQualifiers: (updatedQualifiers: SelectedQualifiers) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}
const StatsDisplay: React.FC<StatsProps> = ({
  stats,
  selectedQualifiers,
  setSelectedQualifiers,
  selectedTab,
  setSelectedTab,
}) => {
  const updateSelectedQualifiers = (
    round: string,
    qualifier: string,
    isChecked: boolean,
  ) => {
    const updatedQualifiers = {
      ...selectedQualifiers,
      [round]: {
        ...selectedQualifiers[round],
        [qualifier]: isChecked,
      },
    };
    setSelectedQualifiers(updatedQualifiers);
  };

  const updateSelectedTab = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <Tabs
      defaultValue="preflop"
      className="w-full"
      onValueChange={updateSelectedTab}
    >
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
                            <i>Made Hands</i>
                          </TableCell>
                        </TableRow>
                      )}
                      {q === "flushdraw" && (
                        <TableRow key={`${round}-content-draws`}>
                          <TableCell className="p-0" colSpan={4}>
                            <i>Draws</i>
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow key={`${round}-content-${q}`}>
                        <TableCell className="stats_hand_check">
                          {round !== "preflop" && (
                            <Checkbox
                              checked={selectedQualifiers[round][q]}
                              onCheckedChange={(isChecked) =>
                                updateSelectedQualifiers(round, q, isChecked)
                              }
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
                          <meter
                            className="w-full"
                            value={(roundStats.get(q) || 0) * 1000}
                            min={0}
                            max={1000}
                          ></meter>
                        </TableCell>
                      </TableRow>
                      {SUBQUALIFIERS[q] &&
                        SUBQUALIFIERS[q].map((sq) => {
                          return (
                            <TableRow
                              key={`${round}-content-${sq}`}
                              className="subqualifier"
                            >
                              <TableCell className="stats_hand_check"></TableCell>
                              <TableCell className="stats_hand_qualifier">
                                {round !== "preflop" && (
                                  <Checkbox
                                    checked={selectedQualifiers[round][sq]}
                                    onCheckedChange={(isChecked) =>
                                      updateSelectedQualifiers(
                                        round,
                                        sq,
                                        isChecked,
                                      )
                                    }
                                  />
                                )}
                                <span className="ml-1">
                                  {QUALIFIER_DISPLAY[sq]}
                                </span>
                              </TableCell>
                              <TableCell className="stats_hand_percent">
                                {((roundStats.get(sq) || 0) * 100).toFixed(1)}%
                              </TableCell>
                              <TableCell className="stats_hand_meter">
                                <meter
                                  className="w-full"
                                  value={(roundStats.get(sq) || 0) * 1000}
                                  min={0}
                                  max={1000}
                                ></meter>
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
