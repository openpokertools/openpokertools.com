const IMG_URL = 'https://media.playamopartners.com/renderimage.aspx?pid=248471&bid=';
const REF_URL = 'https://media.playamopartners.com/redirect.aspx?pid=248471&bid=';

const RUSSIAN_BIDS = [1916, 1847, 1707, 1567, 1493];
const ENGLISH_BIDS = [1772, 1632, 1539, 1477];

const sample = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};

const displayAd = function() {
  const lang = navigator.language.toLowerCase();
  let bid;
  if (lang == 'ru' || lang == 'be' || lang == 'uk') {
    bid = sample(RUSSIAN_BIDS);
  } else {
    bid = sample(ENGLISH_BIDS);
  }
  const ad = $(`<a href="${REF_URL + bid}"><img src="${IMG_URL + bid}" border=0></img></a>`);
  $('#right-gutter').append(ad).append($('<br>')).append(ad.clone());
};

displayAd();
