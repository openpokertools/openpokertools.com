export interface CombosReport {
  flop_combos: number;
  flop_combos_percent: number;
  turn_combos: number;
  turn_combos_percent: number;
  river_combos: number;
  river_combos_percent: number;
}

export const COMBOS_REPORT_DEFAULT: CombosReport = {
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
