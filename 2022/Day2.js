import fs from 'fs'
const buffer = fs.readFileSync('./2022/inputs/Day2.txt');
const inputs = buffer.toString().split('\n');

const HAND_SCORE = {
  X: 1,
  Y: 2,
  Z: 3,
};

const RESULT_SCORE = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

let score = 0;
for (const input of inputs) {
  const [hand1, hand2] = input.split(' ');
  score += RESULT_SCORE[hand1][hand2];
  score += HAND_SCORE[hand2];
}

console.log('Answer Day 2, Part 1: ', score);

const STRATEGY_SCORE = {
  X: 0,
  Y: 3,
  Z: 6,
}

score = 0;
for (const input of inputs) {
  const [hand1, strategy] = input.split(' ');
  const hand2 = Object.entries(RESULT_SCORE[hand1]).find(([, value]) => value === STRATEGY_SCORE[strategy])[0];
  score += RESULT_SCORE[hand1][hand2];
  score += HAND_SCORE[hand2];
}

console.log('Answer Day 2, Part 2: ', score);