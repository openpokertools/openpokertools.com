const RANKS = 'AKQJT98765432';
const SUITS = 'scdh';

// eslint-disable-next-line max-len
const DIAMOND_SVG = '<svg height="75%" style="display: block; margin: auto; margin-top: 8%" viewBox="0 0 57.14286 75" xmlns="http://www.w3.org/2000/svg"><path d="M 40.154739,20.623825 C 32.594025,10.395258 28.571428,0 28.571428,0 c 0,0 -4.022597,10.395258 -11.583311,20.623825 C 9.4238315,30.848825 0,37.5 0,37.5 c 0,0 9.4238315,6.647591 16.988117,16.879733 7.560714,10.224999 11.583311,20.620266 11.583311,20.620266 0,0 4.022597,-10.395267 11.583311,-20.620266 C 47.719024,44.147591 57.142858,37.5 57.142858,37.5 c 0,0 -9.423834,-6.651175 -16.988119,-16.876175 z" style="fill:#df0000;stroke-width:3.5714283"/></svg>';
// eslint-disable-next-line max-len
const HEART_SVG = '<svg height="75%" style="display: block; margin: auto; margin-top: 8%" viewBox="0 0 71.232315 75" xmlns="http://www.w3.org/2000/svg"><path d="m 51.981784,-4e-7 c -14.4379,0 -16.365625,14.4874994 -16.365625,14.4874994 0,0 -1.927725,-14.4874994 -16.365625,-14.4874994 C 9.1444487,-4e-7 -2e-7,6.4958328 -2e-7,18.749999 -2e-7,34.941666 29.29051,51.224224 35.616159,74.999998 41.635334,51.244153 71.232318,34.941666 71.232318,18.749999 71.232318,6.4958328 62.087869,-4e-7 51.981784,-4e-7 Z" style="fill:#df0000;fill-opacity:1;stroke-width:4.30698061"/></svg>';
// eslint-disable-next-line max-len
const CLUB_SVG = '<svg height="75%" style="display: block; margin: auto; margin-top: 8%" viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg"><path d="m 46.022365,34.089478 c 0,0 9.375,-7.499997 9.375,-17.897367 C 55.397365,10.10527 49.993415,3.6991588e-6 37.499998,3.6991588e-6 25.006575,3.6991588e-6 19.602631,10.109218 19.602631,16.192111 c 0,10.39737 9.375,17.897367 9.375,17.897367 C 18.56447,25.97764 -3.4074026e-6,31.515794 -3.4074026e-6,47.727639 -3.4074026e-6,55.84343 6.6315759,64.772373 17.044731,64.772373 c 12.493423,0 17.897373,-13.638155 17.897373,-13.638155 0,0 1.586841,15.544739 -7.66974,23.865788 h 20.455262 c -9.256575,-8.317102 -7.669734,-23.865788 -7.669734,-23.865788 0,0 5.403944,13.638155 17.897367,13.638155 10.417108,0 17.04474,-8.932891 17.04474,-17.044734 0,-16.211845 -18.564473,-21.749999 -28.977634,-13.638161 z" style="fill:#000000;fill-opacity:1;stroke-width:3.94736862"/></svg>';
// eslint-disable-next-line max-len
const SPADE_SVG = '<svg height="75%" style="display: block; margin: auto; margin-top: 8%" viewBox="0 0 62.492939 75" xmlns="http://www.w3.org/2000/svg"><path d="M 62.451125,48.579829 C 61.505884,34.091233 32.191701,6.8211035 31.24646,-2.5e-7 30.301219,6.8175322 0.98703591,34.087662 0.04179509,48.579829 -0.6183111,58.822199 6.6623868,63.068425 13.282978,63.068425 20.451062,62.991354 26.371322,53.066421 28.410738,51.13685 29.355978,53.693871 22.149494,75 19.899664,75 h 22.697498 c -2.24983,0 -9.456314,-21.306129 -8.511074,-23.86315 1.785596,1.772402 7.019498,11.634552 15.131665,11.931575 6.616686,-0.0036 13.893478,-4.246226 13.233372,-14.488596 z" style="fill:#000000;stroke-width:3.73485875"/></svg>';
// eslint-disable-next-line max-len
const EMPTY_SVG = '<svg height="100%" display="block" viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><pattern id="a" width="2.5" height="1" patternTransform="matrix(19.455 -19.455 19.455 19.455 -7.1429 27.143)" patternUnits="userSpaceOnUse"><rect y="-.5" width="1" height="2" fill="#190c80"/></pattern></defs><rect transform="scale(-1,1)" x="-585" y="15" width="570" height="870" fill="url(#a)" stroke="#190c80" stroke-width="30"/></svg>';

const SUIT_SVGS = {
  'd': DIAMOND_SVG,
  'h': HEART_SVG,
  'c': CLUB_SVG,
  's': SPADE_SVG,
};

const SELECTEDCARDS = new Set();


const makeCard = function(suit, rank, height, id) {
  const width = height * 2 / 3;
  const fontsize = height / 2;

  let color = '';
  if (suit == 'd' || suit == 'h') {
    color = '#df0000';
  } else {
    color = '#000';
  }

  // eslint-disable-next-line max-len
  const card = $(`<div class='rounded playingcard border' id=${id} style='width: ${width}px;height: ${height}px; margin:2px'></div>`)
      .append(
          $(`<div class="text-center" style="width: 100%;height: 50%;color: ${color}"></div>`)
              .append(
                  $(`<div style='font-size: ${fontsize}px; line-height: 100%;'>${rank}</div>`),
              ),
      )
      .append(
          $('<div class="text-center" style="width: 100%;height: 50%;"></div>')
              .append(
                  SUIT_SVGS[suit],
              ),
      );

  return card;
};


const makeHiddenCard = function(height) {
  const width = height * 2 / 3;
  // eslint-disable-next-line max-len
  const card = $(`<div class='rounded playingcard' style='height: ${height}px; width: ${width}px;margin:0px 3px' value='empty'></div>`).append(EMPTY_SVG);
  return card;
};
exports.makeHiddenCard = makeHiddenCard;


const genCardSelect = function() {
  const id = $(this).attr('id');

  const pop = $('<div></div>');
  for (let i = 0; i < SUITS.length; i++) {
    const s = SUITS[i];
    const row = $('<div class="row mx-0"></div>');
    for (let j = 0; j < RANKS.length; j++) {
      const r = RANKS[j];
      const c = makeCard(s, r, 40, `${id}_${r}${s}`);

      if (SELECTEDCARDS.has(r + s)) {
        c.addClass('selected');
      } else {
        c.click(replaceCard);
      }

      row.append(c);
    }
    pop.append(row);
  }
  // eslint-disable-next-line max-len
  const clear = $('<button type="button" class="btn btn-light border" style="width: 99%; margin:2px 0px 2px 2px">Clear</button>')
      .attr('id', `${id}_clear`)
      .click(clearCard);
  pop.append(clear);
  return pop;
};


exports.addCardSelect = function(element) {
  element.popover({
    container: 'body',
    content: genCardSelect,
    trigger: 'focus',
    html: true,
    placement: 'bottom',
  });
};


const clearCard = function() {
  const id = $(this).attr('id').split('_');
  const baseID = id[0];

  const value = $(`#${baseID}`).attr('value');
  const height = parseInt($(`#${baseID}`).css('height'));

  SELECTEDCARDS.delete(value);

  const newCard = makeHiddenCard(height);
  $(`#${baseID}`).html(newCard.children());
  $(`#${baseID}`).attr('value', 'empty');
  $(`#${baseID}`).removeClass('border');
  window.cardUpdate(baseID);
};


exports.removeSelection = function(value) {
  SELECTEDCARDS.delete(value);
};


const replaceCard = function() {
  const id = $(this).attr('id').split('_');
  const baseID = id[0];
  const r = id[1][0];
  const s = id[1][1];

  const value = $(`#${baseID}`).attr('value');
  const height = parseInt($(`#${baseID}`).css('height'));

  SELECTEDCARDS.delete(value);
  SELECTEDCARDS.add(id[1]);

  const newCard = makeCard(s, r, height, 'tmp');
  $(`#${baseID}`).html(newCard.children());
  $(`#${baseID}`).attr('value', r + s);
  $(`#${baseID}`).addClass('border');
  window.cardUpdate(baseID);
};


const randomChoice = function(choices) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
};


exports.setCardRandom = function(id) {
  const value = $(`#${id}`).attr('value');
  const height = parseInt($(`#${id}`).css('height'));

  SELECTEDCARDS.delete(value);

  const availableCards = [];
  for (let i = 0; i < SUITS.length; i++) {
    const s = SUITS[i];
    for (let j = 0; j < RANKS.length; j++) {
      const r = RANKS[j];
      if (!SELECTEDCARDS.has(r + s)) {
        availableCards.push(r + s);
      }
    }
  }

  const newRS = randomChoice(availableCards);

  SELECTEDCARDS.add(newRS);

  const newCard = makeCard(newRS[1], newRS[0], height, 'tmp');
  $(`#${id}`).html(newCard.children());
  $(`#${id}`).attr('value', newRS);
  $(`#${id}`).addClass('border');
};


exports.resetCard = function(id) {
  const value = $(`#${id}`).attr('value');
  const height = parseInt($(`#${id}`).css('height'));

  SELECTEDCARDS.delete(value);
  const newCard = makeHiddenCard(height);
  $(`#${id}`).html(newCard.children());
  $(`#${id}`).attr('value', 'empty');
  $(`#${id}`).removeClass('border');
};
