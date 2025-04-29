import React from "react";

import { ReactComponent as TWO_SVG } from "../../images/ranks/2.svg";
import { ReactComponent as THREE_SVG } from "../../images/ranks/3.svg";
import { ReactComponent as FOUR_SVG } from "../../images/ranks/4.svg";
import { ReactComponent as FIVE_SVG } from "../../images/ranks/5.svg";
import { ReactComponent as SIX_SVG } from "../../images/ranks/6.svg";
import { ReactComponent as SEVEN_SVG } from "../../images/ranks/7.svg";
import { ReactComponent as EIGHT_SVG } from "../../images/ranks/8.svg";
import { ReactComponent as NINE_SVG } from "../../images/ranks/9.svg";
import { ReactComponent as ACE_SVG } from "../../images/ranks/A.svg";
import { ReactComponent as JACK_SVG } from "../../images/ranks/J.svg";
import { ReactComponent as KING_SVG } from "../../images/ranks/K.svg";
import { ReactComponent as QUEEN_SVG } from "../../images/ranks/Q.svg";
import { ReactComponent as TEN_SVG } from "../../images/ranks/T.svg";
import { ReactComponent as CLUB_SVG } from "../../images/suits/club.svg";
import { ReactComponent as DIAMOND_SVG } from "../../images/suits/diamond.svg";
import { ReactComponent as HEART_SVG } from "../../images/suits/heart.svg";
import { ReactComponent as SPADE_SVG } from "../../images/suits/spade.svg";

export const SUIT_SVGS: { [key: string]: JSX.Element } = {
  d: <DIAMOND_SVG width={"1.2em"} style={{ display: "block", margin: "auto" }} />,
  h: <HEART_SVG width={"1.2em"} style={{ display: "block", margin: "auto" }} />,
  c: <CLUB_SVG width={"1.2em"} style={{ display: "block", margin: "auto" }} />,
  s: <SPADE_SVG width={"1.2em"} style={{ display: "block", margin: "auto" }} />,
};

export const RANK_SVGS: { [key: string]: JSX.Element } = {
  A: <ACE_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  K: <KING_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  Q: <QUEEN_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  J: <JACK_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  T: <TEN_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  "9": <NINE_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  "8": <EIGHT_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  "7": <SEVEN_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  "6": <SIX_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  "5": <FIVE_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  "4": <FOUR_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  "3": <THREE_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
  "2": <TWO_SVG width={"1.1em"} style={{ display: "block", margin: "auto" }} />,
};
