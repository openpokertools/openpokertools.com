const descriptorutils = require('../src/utils/descriptor_utils');

test('qualifyCards #1', () => {
  const hand = ['As', '2s'];
  const board = ['Kh', '3s', '4s'];
  expect(descriptorutils.qualifyCards(hand, board)).toEqual(
      ['highcard', 'acehigh', 'flushdraw', 'flushdraw_gutshot', 'gutshot']);
});

test('qualifyCards #2', () => {
  const hand = ['As', 'Ah'];
  const board = ['Kh', '3s', '4s'];
  expect(descriptorutils.qualifyCards(hand, board)).toEqual(
      ['pair', 'overpair', 'backdoorflushdraw', 'overcards']);
});

test('qualifyCards #3', () => {
  const hand = ['5s', '6s'];
  const board = ['Ks', '3s', '4s'];
  expect(descriptorutils.qualifyCards(hand, board)).toEqual(
      ['flush', 'oesd']);
});
