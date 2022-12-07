import fs from 'fs'
const buffer = fs.readFileSync('./2022/inputs/Day4.txt');
const inputs = buffer.toString().split('\n');

let score = 0;

for (const input of inputs) {
  const [range1, range2] = input.split(',');
  const [range1Start, range1End] = range1.split('-').map(n => parseInt(n));
  const [range2Start, range2End] = range2.split('-').map(n => parseInt(n));

  if (range1Start <= range2Start && range1End >= range2End) {
    score++;
  } else if (range2Start <= range1Start && range2End >= range1End) {
    score++;
  }
}

console.log('Answer Day 4, Part 1: ', score);

score = 0;

for (const input of inputs) {
  const [range1, range2] = input.split(',');
  const [range1Start, range1End] = range1.split('-').map(n => parseInt(n));
  const [range2Start, range2End] = range2.split('-').map(n => parseInt(n));

  if (range1Start >= range2Start && range1Start <= range2End) {
    score++;
  } else if (range2Start >= range1Start && range2Start <= range1End) {
    score++;
  }
}

console.log('Answer Day 4, Part 2: ', score);