const fasthandhand = require('../src/utils/fast_hand_hand');


test('calculateHandHandEquities1', () => {
  const hands = [['Ks', 'Th'], ['8d', '6h']];
  expect(fasthandhand.calculateHandHandEquities(hands, [])).toEqual(
      [[1097019, 604784], [10501, 10501], 1712304]);
});


test('calculateHandHandEquities2', () => {
  const hands = [['2d', 'Th'], ['Jc', '6h'], ['Ah', 'Qh']];
  expect(fasthandhand.calculateHandHandEquities(hands, [])).toEqual(
      [[308193, 359412, 697250], [5899, 5899, 5899], 1370754]);
});
