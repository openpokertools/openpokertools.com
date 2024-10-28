import React, { useState } from "react";
import { CombosReport, EquityReport } from "./report-props";
import { Underline } from "lucide-react";

interface ReportProps {
    combosReport: CombosReport;
    equityReport: EquityReport;
}
const Report: React.FC<ReportProps> = ({ combosReport, equityReport }) => {
    return (
        <>
            <p className="pl-2 mt-2 mb-0">
                <strong>
                    {equityReport.preflop !== undefined
                        ? "~" + (equityReport.preflop * 100).toFixed(1) + "%"
                        : "-"}
                </strong>{" "}
                against Pre-flop combos
            </p>
            <p className="pl-2 my-0">
                <strong>
                    {equityReport.flop !== undefined
                        ? (equityReport.flop * 100).toFixed(1) + "%"
                        : "-"}
                </strong>{" "}
                against Flop combos
            </p>
            <p className="pl-2 my-0">
                <strong>
                    {equityReport.turn !== undefined
                        ? (equityReport.turn * 100).toFixed(1) + "%"
                        : "-"}
                </strong>{" "}
                against Turn combos
            </p>
            <p className="pl-2 my-0">
                <strong>
                    {equityReport.river !== undefined
                        ? (equityReport.river * 100).toFixed(1) + "%"
                        : "-"}
                </strong>{" "}
                against River combos
            </p>
            <h4 className="mt-2 mb-1">Flop</h4>
            <p className="pl-2 my-0">
                <strong>{combosReport.flop_combos}</strong> combos kept to Turn
            </p>
            <p className="pl-2 my-0">
                <strong>{combosReport.flop_combos_percent.toFixed(1)}%</strong>{" "}
                of Flop combos
            </p>
            <h4 className="mt-2 mb-1">Turn</h4>
            <p className="pl-2 my-0">
                <strong>{combosReport.turn_combos}</strong> combos kept to River
            </p>
            <p className="pl-2 my-0">
                <strong>{combosReport.turn_combos_percent.toFixed(1)}%</strong>{" "}
                of Turn combos
            </p>
            <h4 className="mt-2 mb-1">River</h4>
            <p className="pl-2 my-0">
                <strong>{combosReport.river_combos}</strong> combos kept to
                Showdown
            </p>
            <p className="pl-2 my-0">
                <strong>{combosReport.river_combos_percent.toFixed(1)}%</strong>{" "}
                of River combos
            </p>
        </>
    );
};

export default Report;
