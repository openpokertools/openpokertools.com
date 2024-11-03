const makeComboText = (combo: [string, string]): string => {
  let card1;
  let card2;
  if (combo[0][1] === "h" || combo[0][1] === "d") {
    card1 = `<span style='color:red'>${c[0][0]}${SUITS_TO_HTML[c[0][1]]}</span>`;
  } else {
    // eslint-disable-next-line max-len
    card1 = `<span style='color:black'>${c[0][0]}${SUITS_TO_HTML[c[0][1]]}</span>`;
  }
  if (c[1][1] === "h" || c[1][1] === "d") {
    // eslint-disable-next-line max-len
    card2 = `<span style='color:red'>${c[1][0]}${SUITS_TO_HTML[c[1][1]]}</span>`;
  } else {
    // eslint-disable-next-line max-len
    card2 = `<span style='color:black'>${c[1][0]}${SUITS_TO_HTML[c[1][1]]}</span>`;
  }
  return card1 + card2;
};
