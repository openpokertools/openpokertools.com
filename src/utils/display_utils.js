const specialRound = function(number) {
  if (number < 5) {
    return Math.round(number * 2) / 2;
  }
  return Math.round(number);
};


exports.getPotOdds = function(win, tie) {
  const x = win * 100 + tie * 50;
  const numerator = 100 - x;
  if (numerator > x) {
    if (x <= 0) {
      return '∞';
    }
    return specialRound(numerator / x).toString() + ':1';
  } else {
    if (numerator <= 0) {
      return '0';
    }
    return '1:' + specialRound(x / numerator).toString();
  }
};
