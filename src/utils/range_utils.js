// eslint-disable-next-line max-len
const COMBOS_ORDERED = ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', 'AKs', 'AQs', '88', 'AJs', 'AKo', 'KQs', 'ATs', 'AQo', '77', 'KJs', 'A9s', 'KTs', 'AJo', 'KQo', 'QJs', 'A8s', '66', 'QTs', 'ATo', 'K9s', 'A7s', 'KJo', 'JTs', 'A5s', 'A6s', 'KTo', 'Q9s', '55', 'A9o', 'QJo', 'A4s', 'K8s', 'A3s', 'A8o', 'K7s', 'J9s', 'QTo', 'A2s', 'Q8s', 'K9o', 'K6s', 'A7o', 'T9s', '44', 'JTo', 'K5s', 'J8s', 'A5o', 'Q7s', 'A6o', 'Q9o', 'K4s', 'T8s', 'K3s', 'K8o', 'A4o', 'Q6s', '98s', 'K7o', 'J7s', 'K2s', 'A3o', '33', 'J9o', 'Q5s', 'T7s', 'Q8o', 'T9o', 'A2o', 'K6o', 'Q4s', 'J6s', '97s', 'Q3s', 'J5s', 'K5o', '87s', 'J8o', '22', 'T6s', 'Q2s', 'Q7o', 'J4s', '96s', 'K4o', 'T8o', '86s', '76s', 'J3s', '98o', 'Q6o', 'J7o', 'K3o', 'T5s', 'T4s', 'K2o', 'J2s', '95s', 'Q5o', 'T3s', 'T7o', '85s', '65s', 'Q4o', '75s', 'J6o', 'T2s', '97o', '94s', '87o', 'Q3o', '93s', '54s', '84s', 'J5o', '64s', 'T6o', '74s', 'Q2o', '92s', 'J4o', '53s', '96o', '86o', '76o', '73s', '83s', '63s', 'J3o', 'T5o', '82s', '43s', 'J2o', 'T4o', '95o', '52s', '62s', '72s', '85o', '65o', '75o', 'T3o', '42s', '32s', 'T2o', '94o', '54o', '84o', '64o', '93o', '74o', '92o', '53o', '83o', '63o', '73o', '43o', '82o', '52o', '62o', '72o', '42o', '32o'];
exports.CO = COMBOS_ORDERED;
const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const SUITS = ['s', 'h', 'd', 'c'];

let USER_RANGE_INDICES = [];
const USER_RANGE_NAMES = [];
const USER_RANGES = [];

const SIX_MAX_OPEN = {
  'UTG': '44+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, ATo+, KJo+',
  // eslint-disable-next-line max-len
  'UTG+1': '22+, A2s+, K8s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s, ATo+, KTo+, QJo, JTo',
  // eslint-disable-next-line max-len
  'Cutoff': '22+, A2s+, K6s+, Q8s+, J8s+, T8s+, 97s+, 86s+, 75s+, 65s, 54s, 43s, 32s, A8o+, A5o, KTo+, QTo+, JTo, T9o, 98o',
  // eslint-disable-next-line max-len
  'Button': '22+, A2s+, K2s+, Q4s+, J6s+, T6s+, 95s+, 85s+, 74s+, 63s+, 53s+, 43s, 32s, A2o+, K7o+, Q9o+, J9o+, T9o, 98o',
  // eslint-disable-next-line max-len
  'Small Blind': '22+, A2s+, K2s+, Q3s+, J4s+, T4s+, 94s+, 84s+, 73s+, 63s+, 53s+, 43s, 32s, A2o+, K4o+, Q8o+, J9o+, T9o, 98o',
};

const NINE_MAX_OPEN = {
  'UTG': '77+, ATs+, A5s, KTs+, QTs+, J9s+, T9s, 98s, AQo+',
  'UTG+1': '77+, ATs+, A5s, KTs+, QTs+, J9s+, T9s, 98s, AQo+',
  'UTG+2': '77+, A8s+, A4s-A5s, K9s+, Q9s+, J9s+, T9s, 98s, AJo+',
  'Lojack': '44+, A2s+, K9s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, ATo+, KJo+',
  // eslint-disable-next-line max-len
  'Hijack': '22+, A2s+, K8s+, Q9s+, J9s+, T9s, 98s, 87s, 76s, 65s, 54s, ATo+, KTo+, QJo, JTo',
  // eslint-disable-next-line max-len
  'Cutoff': '22+, A2s+, K6s+, Q8s+, J8s+, T8s+, 97s+, 86s+, 75s+, 65s, 54s, 43s, 32s, A8o+, A5o, KTo+, QTo+, JTo, T9o, 98o',
  // eslint-disable-next-line max-len
  'Button': '22+, A2s+, K2s+, Q4s+, J6s+, T6s+, 95s+, 85s+, 74s+, 63s+, 53s+, 43s, 32s, A2o+, K7o+, Q9o+, J9o+, T9o, 98o',
  // eslint-disable-next-line max-len
  'Small Blind': '22+, A2s+, K2s+, Q3s+, J4s+, T4s+, 94s+, 84s+, 73s+, 63s+, 53s+, 43s, 32s, A2o+, K4o+, Q8o+, J9o+, T9o, 98o',
};


const getID = function(element) {
  return element.attr('id').split('_')[0];
};


// Range saving and loading

exports.loadRanges = function() {
  const userRangeIndices = localStorage.getItem('RANGEINDICES');
  if (userRangeIndices === null) {
    return;
  } else if (userRangeIndices.includes('NaN') || userRangeIndices === '') {
    localStorage.clear();
  } else {
    USER_RANGE_INDICES = userRangeIndices.split(',');
  }
  for (let i = 0; i < USER_RANGE_INDICES.length; i++) {
    const ind = USER_RANGE_INDICES[i];
    const rangeName = localStorage.getItem('rn' + ind);
    const range = localStorage.getItem('r' + ind);
    USER_RANGE_NAMES.push(rangeName);
    USER_RANGES.push(range);
  }
};


const saveRange = function() {
  const rangeName = prompt('Please enter a name for this range.');
  if (rangeName === null) {
    return;
  }
  const id = getID($(this));
  const range = $(`#${id}_range`).val();
  let uri = '';
  if (USER_RANGE_INDICES.length === 0) {
    uri = '0';
  } else {
    uri = (parseInt(
        USER_RANGE_INDICES[USER_RANGE_INDICES.length - 1]) + 1
    ).toString();
  }
  USER_RANGE_INDICES.push(uri);
  localStorage.setItem('RANGEINDICES', USER_RANGE_INDICES.join());
  localStorage.setItem('rn' + uri, rangeName);
  localStorage.setItem('r' + uri, range);
  // eslint-disable-next-line max-len
  $('.customrangesgroup').append($(`<option id='${uri}_user_range' class='${uri}_user_range' value='${range}'>${rangeName}</option>`));
  $(`#${id}_rangeloaderselector`).val(`${range}`);
};


const delRange = function() {
  const id = getID($(this));
  const selected = $('option:selected', $(`#${id}_rangeloaderselector`));
  const group = selected.parent().attr('id');
  if (group !== 'customrangesgroup') {
    return;
  }
  const uri = selected.attr('id').split('_')[0];
  const i = USER_RANGE_INDICES.indexOf(uri);
  USER_RANGE_INDICES.splice(i, 1);

  if (USER_RANGE_INDICES.length > 0) {
    localStorage.setItem('RANGEINDICES', USER_RANGE_INDICES.join());
  } else {
    localStorage.removeItem('RANGEINDICES');
  }
  localStorage.removeItem('rn' + uri);
  localStorage.removeItem('r' + uri);
  $(`.${uri}_user_range`).remove();
};


const loadRange = function() {
  const id = getID($(this));
  const descriptor = $('option:selected', this).val();
  descriptorUpdateManual(id, descriptor);
};

const createRangeLoader = function(id) {
  // eslint-disable-next-line max-len
  const saveBTN = $(`<button type='button' class='btn btn-success' id='${id}_saverange' style='width: 45%; white-space: nowrap;'>Save range</button>`)
      .click(saveRange);
  // eslint-disable-next-line max-len
  const delBTN = $(`<button type='button' class='btn btn-danger ml-2' id='${id}_delrange' style='width: 45%; white-space: nowrap;'>Delete range</button>`)
      .click(delRange);
  // eslint-disable-next-line max-len
  const selector = $(`<select name='saved_range' id='${id}_rangeloaderselector' class='form-select ml-auto' style='width: 100%; height: 100%' aria-label='User range selector'></select>`)
      .change(loadRange);
  // eslint-disable-next-line max-len
  selector.append($('<option id="empty_user_range" value="">&lt;empty&gt;</option>'));
  // eslint-disable-next-line max-len
  const custom = $('<optgroup label="Custom Ranges" id="customrangesgroup" class="customrangesgroup"></optgroup>');
  for (let i = 0; i < USER_RANGE_NAMES.length; i++) {
    // eslint-disable-next-line max-len
    custom.append(`<option id='${USER_RANGE_INDICES[i]}_user_range' class='${USER_RANGE_INDICES[i]}_user_range' value='${USER_RANGES[i]}'>${USER_RANGE_NAMES[i]}</option>`);
  }
  selector.append(custom);
  const sixmax = $('<optgroup label="6-Max Opening Ranges"></optgroup>');
  for (const k in SIX_MAX_OPEN) {
    // eslint-disable-next-line max-len
    sixmax.append(`<option id='sixmax_${k}' value='${SIX_MAX_OPEN[k]}'>${k}</option>`);
  }
  selector.append(sixmax);
  const ninemax = $('<optgroup label="9-Max Opening Ranges"></optgroup>');
  for (const k in NINE_MAX_OPEN) {
    // eslint-disable-next-line max-len
    ninemax.append(`<option id='ninemax_${k}' value='${NINE_MAX_OPEN[k]}'>${k}</option>`);
  }
  selector.append(ninemax);
  const buttons = $('<div class="col-7" style="padding: 0"></div>')
      .append(saveBTN, delBTN);
  const selectorDiv = $('<div class="col-5" style="padding: 0"></div>')
      .append(selector);
  const row = $('<div class="range_loader row mt-2 mx-0"></div>');
  row.append(buttons, selectorDiv);
  return row;
};


// Build table selector

const selectCell = function() {
  $(this).toggleClass('selected');
  const id = getID($(this));
  updateDescriptor(id);
  updatePercent(id, true);
  window.rangeUpdate(id);
};


const createCell = function(cellID, cellText, comboType) {
  const cell = $('<td></td>').attr({
    id: cellID,
    class: 'range_cell ' + comboType,
  }).mousedown(selectCell).append(cellText);
  return cell;
};


const createTableSelector = function(id) {
  const body = $('<tbody></tbody>');
  for (let i = 0; i < 13; i++) {
    const row = $('<tr></tr>');
    for (let j = 0; j < 13; j++) {
      let combo = '';
      let cell = '';
      if (i === j) {
        combo = RANKS[i] + RANKS[j];
        cell = createCell(`${id}_${combo}`, combo, 'pocketpair');
      } else if (i < j) {
        combo = RANKS[i] + RANKS[j] + 's';
        cell = createCell(`${id}_${combo}`, combo, 'suited');
      } else {
        combo = RANKS[j] + RANKS[i] + 'o';
        cell = createCell(`${id}_${combo}`, combo, 'offsuit');
      }
      row.append(cell);
    }
    body.append(row);
  }
  // eslint-disable-next-line max-len
  const table = $(`<table id='${id}_table' class='mx-auto range_table'></table>`).append(body);
  return table;
};


// Update range

const descriptorUpdate = function(e) {
  const id = getID($(this));
  const descriptor = $(this).val();
  const combos = expandRange(descriptor);
  for (const c of COMBOS_ORDERED) {
    $(`#${id}_${c}`).removeClass('selected');
  }
  combos.forEach((c) => {
    return $(`#${id}_${c}`).addClass('selected');
  });
  updatePercent(id, true);
  window.rangeUpdate(id);
};


const descriptorUpdateManual = function(id, descriptor) {
  $(`#${id}_range`).val(descriptor);
  const combos = expandRange(descriptor);
  for (const c of COMBOS_ORDERED) {
    $(`#${id}_${c}`).removeClass('selected');
  }
  combos.forEach((c) => {
    return $(`#${id}_${c}`).addClass('selected');
  });
  updatePercent(id, true);
  window.rangeUpdate(id);
};


const expandRange = function(rangeString) {
  const combos = new Set();
  const comboRanges = rangeString.toUpperCase().split(/[\s,]+/);
  for (let i = 0; i < comboRanges.length; i++) {
    const combs = expandComboRange(comboRanges[i]);
    for (let j = 0; j < combs.length; j++) {
      combos.add(combs[j]);
    }
  }
  return combos;
};


const expandComboRange = function(comboRangeString) {
  const c = comboRangeString;
  if (c[c.length - 1] === '+') {
    return expandPlus(c);
  } else if (c[c.length - 1] === '-') {
    return expandMinus(c);
  } else if (c.indexOf('-') >= 0) {
    return expandDash(c);
  } else {
    if (c.length < 2) {
      return [];
    } else if (c.length === 2) {
      return [c];
    } else {
      return [c[0] + c[1] + c[2].toLowerCase()];
    }
  }
};


const expandPlus = function(c) {
  const combos = [];
  const ind = RANKS.indexOf(c[1]);
  if (c[0] === c[1]) {
    for (let i = 0; i <= ind; i++) {
      combos.push(RANKS[i] + RANKS[i]);
    }
  } else {
    const j = RANKS.indexOf(c[0]);
    for (let k = j + 1; k <= ind; k++) {
      combos.push(c[0] + RANKS[k] + c[2].toLowerCase());
    }
  }
  return combos;
};


const expandMinus = function(c) {
  const combos = [];
  const ind = RANKS.indexOf(c[1]);
  if (c[0] === c[1]) {
    for (let j = ind; j <= 12; j++) {
      combos.push(RANKS[j] + RANKS[j]);
    }
  } else {
    for (let j = ind; j <= 12; j++) {
      combos.push(c[0] + RANKS[j] + c[2].toLowerCase());
    }
  }
  return combos;
};


const expandDash = function(c) {
  const combos = [];
  const x = c.split('-');
  const start = x[0];
  const end = x[1];
  let i = RANKS.indexOf(start[1]);
  let j = RANKS.indexOf(end[1]);

  if (j > i) {
    const tmp = j;
    j = i;
    i = tmp;
  }

  if (start[0] === start[1]) {
    for (let k = j; k <= i; k++) {
      combos.push(RANKS[k] + RANKS[k]);
    }
  } else {
    for (let k = j; k <= i; k++) {
      combos.push(start[0] + RANKS[k] + start[2].toLowerCase());
    }
  }
  return combos;
};


const updateDescriptor = function(id) {
  let fullDescriptor = '';

  // pocket pairs
  let streak = false;
  let start = '';
  let current = '';
  for (let i = 0; i <= 12; i++) {
    const selected = $(`#${id}_${RANKS[i]}${RANKS[i]}`).hasClass('selected');
    if (selected) {
      if (!streak) {
        streak = true;
        start = RANKS[i] + RANKS[i];
      }
      current = RANKS[i] + RANKS[i];
    } else {
      if (streak) {
        if (start === current) {
          fullDescriptor += current + ', ';
        } else if (start === 'AA') {
          fullDescriptor += current + '+, ';
        } else {
          fullDescriptor += current + '-' + start + ', ';
        }
      }
      streak = false;
    }
  }
  if (streak) {
    if (start === current) {
      fullDescriptor += current + ', ';
    } else if (start === 'AA') {
      fullDescriptor += current + '+, ';
    } else {
      fullDescriptor += start + '-, ';
    }
  }

  // suited
  for (let i = 0; i <= 11; i++) {
    streak = false;
    start = '';
    current = '';
    for (let j = i + 1; j <= 12; j++) {
      const selected = $(`#${id}_${RANKS[i]}${RANKS[j]}s`).hasClass('selected');
      if (selected) {
        if (!streak) {
          streak = true;
          start = RANKS[i] + RANKS[j] + 's';
        }
        current = RANKS[i] + RANKS[j] + 's';
      } else {
        if (streak) {
          if (start === current) {
            fullDescriptor += current + ', ';
          } else if (start === RANKS[i] + RANKS[i + 1] + 's') {
            fullDescriptor += current + '+, ';
          } else {
            fullDescriptor += current + '-' + start + ', ';
          }
        }
        streak = false;
      }
    }
    if (streak) {
      if (start === current) {
        fullDescriptor += current + ', ';
      } else if (start === RANKS[i] + RANKS[i + 1] + 's') {
        fullDescriptor += current + '+, ';
      } else {
        fullDescriptor += start + '-, ';
      }
    }
  }

  // offsuit
  for (let i = 0; i <= 11; i++) {
    streak = false;
    start = '';
    current = '';
    for (let j = i + 1; j <= 12; j++) {
      const selected = $(`#${id}_${RANKS[i]}${RANKS[j]}o`).hasClass('selected');
      if (selected) {
        if (!streak) {
          streak = true;
          start = RANKS[i] + RANKS[j] + 'o';
        }
        current = RANKS[i] + RANKS[j] + 'o';
      } else {
        if (streak) {
          if (start === current) {
            fullDescriptor += current + ', ';
          } else if (start === RANKS[i] + RANKS[i + 1] + 'o') {
            fullDescriptor += current + '+, ';
          } else {
            fullDescriptor += current + '-' + start + ', ';
          }
        }
        streak = false;
      }
    }
    if (streak) {
      if (start === current) {
        fullDescriptor += current + ', ';
      } else if (start === RANKS[i] + RANKS[i + 1] + 'o') {
        fullDescriptor += current + '+, ';
      } else {
        fullDescriptor += start + '-, ';
      }
    }
  }
  if (fullDescriptor.length > 2) {
    fullDescriptor = fullDescriptor.slice(0, -2);
  }
  $(`#${id}_range`).val(fullDescriptor);
};


const sliderUpdate = function(data) {
  const valStart = data.from;
  const valEnd = data.to;
  const id = getID(data.input);
  let m = 0;
  for (const c of COMBOS_ORDERED) {
    $(`#${id}_${c}`).removeClass('selected');
  }
  for (const c of COMBOS_ORDERED) {
    if (c[0] === c[1]) {
      m += 6;
    } else if (c[2] === 's') {
      m += 4;
    } else {
      m += 12;
    }
    if (m > valStart && m <= valEnd) {
      $(`#${id}_${c}`).addClass('selected');
    }
    if (m > valEnd) {
      break;
    }
  }
  updateDescriptor(id);
  updatePercent(id, false);
  window.rangeUpdate(id);
};


const updatePercent = function(id, setSlider) {
  let rangeTotal = 0;
  let topTotal = 0;
  let aboveRange = true;
  for (const c of COMBOS_ORDERED) {
    if ($(`#${id}_${c}`).hasClass('selected')) {
      aboveRange = false;
      if (c[0] === c[1]) {
        rangeTotal += 6;
      } else if (c[2] === 's') {
        rangeTotal += 4;
      } else {
        rangeTotal += 12;
      }
    } else {
      let val = 0;
      if (c[0] === c[1]) {
        val = 6;
      } else if (c[2] === 's') {
        val = 4;
      } else {
        val = 12;
      }
      if (aboveRange) {
        topTotal += val;
      }
    }
  }
  if (topTotal === 1326) {
    topTotal = 0;
  }
  const raise = (topTotal / 1326 * 100).toFixed(1) + '%';
  const call = (rangeTotal / 1326 * 100).toFixed(1) + '%';
  $(`#${id}_percent`).text('R: ' + raise + ', C: ' + call);
  $(`#${id}_percent_display`).text(call);
  if (setSlider) {
    $(`#${id}_slider`).data('ionRangeSlider').update({
      from: topTotal,
      to: topTotal + rangeTotal,
    });
  }
};


exports.buildRange = function(title, id) {
  const header = $(`<h4 class='mb-2'>${title}</h4>`);
  // eslint-disable-next-line max-len
  const rangePercent = $(`<div id='${id}_percent' style='float: right;' data-toggle='tooltip' data-html='true' title='<strong>Raising</strong> and <strong>Calling</strong> percentages'>R: 0.0%, C: 0.0%</div>`);
  rangePercent.tooltip();
  header.append(rangePercent);
  // eslint-disable-next-line max-len
  const rangeString = $(`<input type='text' style='width: 100%; font-size: small;' id='${id}_range' aria-label='Range text input'>`);
  const rangeSlider = $('<div class="my-1"></div>');
  // eslint-disable-next-line max-len
  const dummy = $(`<input id='${id}_slider' type='text' class='js-range-slider' value='' />`);
  rangeSlider.append(dummy);
  dummy.ionRangeSlider({
    type: 'double',
    min: 0,
    max: 1326,
    from: 0,
    to: 0,
    skin: 'round',
    hide_min_max: true,
    hide_from_to: true,
    drag_interval: true,
    onChange: sliderUpdate,
  });
  const rangeTable = createTableSelector(id);
  const rangeLoader = createRangeLoader(id);
  rangeString.on('keyup', descriptorUpdate);
  // eslint-disable-next-line max-len
  const rangeSelector = $(`<div id='${id}_player' class='col-5 player p-3'></div>`)
      .append(header)
      .append(rangeString)
      .append(rangeSlider)
      .append(rangeTable)
      .append(rangeLoader);
  return rangeSelector;
};


const expandCombos = function(combos) {
  const hands = [];
  for (const c of combos) {
    const expansion = expandCombo(c);
    for (const h of expansion) {
      hands.push(h);
    }
  }
  return hands;
};


const expandCombo = function(combo) {
  const hands = [];
  if (combo.length === 2) {
    for (let i = 0; i <= 2; i++) {
      for (let j = i + 1; j <= 3; j++) {
        hands.push([combo[0] + SUITS[i], combo[1] + SUITS[j]]);
      }
    }
  } else if (combo[2] === 's') {
    for (const s of SUITS) {
      hands.push([combo[0] + s, combo[1] + s]);
    }
  } else {
    for (const s1 of SUITS) {
      for (const s2 of SUITS) {
        if (s1 !== s2) {
          hands.push([combo[0] + s1, combo[1] + s2]);
        }
      }
    }
  }
  return hands;
};


const getHoleCards = function(id) {
  const c1 = $(`#${id}card1`).attr('value');
  const c2 = $(`#${id}card2`).attr('value');
  if (c1 === 'empty' || c2 === 'empty') {
    throw 'Incomplete hand';
  } else {
    return [[c1, c2]];
  }
};


exports.getPlayerHands = function(id) {
  try {
    return getHoleCards(id);
  } catch (error) {
    const combos = [];
    for (const c of COMBOS_ORDERED) {
      if ($(`#${id}_${c}`).hasClass('selected')) {
        combos.push(c);
      }
    }
    const hands = expandCombos(combos);
    if (hands.length > 0) {
      return hands;
    }
    const name = $(`#${id}_name`).text();
    throw `No hands in <strong>${name}</strong> range`;
  }
};


exports.getHands = function(id) {
  const combos = [];
  for (const c of COMBOS_ORDERED) {
    if ($(`#${id}_${c}`).hasClass('selected')) {
      combos.push(c);
    }
  }
  return expandCombos(combos);
};
