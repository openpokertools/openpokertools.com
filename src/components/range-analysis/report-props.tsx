export type { CombosReport } from "@/lib/models";

export const COMBOS_REPORT_DEFAULT = {
  flop_combos: 0,
  flop_combos_percent: 0,
  turn_combos: 0,
  turn_combos_percent: 0,
  river_combos: 0,
  river_combos_percent: 0,
};

export interface EquityReport {
  preflop?: number;
  flop?: number;
  turn?: number;
  river?: number;
}
