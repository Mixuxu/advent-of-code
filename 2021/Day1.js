const fs = require('fs');
const path = require('path');
const buffer = fs.readFileSync(path.resolve(__dirname, './inputs/Day1.txt'));
const inputs = buffer.toString().split('\n').map((input) => parseInt(input));

let i = 0;
let previousInput = undefined;

for (const input of inputs) {
  i += input > previousInput ? 1 : 0;
  previousInput = input;
}

console.log('Answer Day 1, Part 1: ', i);

const groups = [];
for (const input of inputs) {
  for (const group of groups) {
    if (group.length < 3) {
      group.push(input);
    }
  }
  groups.push([input]);
}

i = 0;
previousInput = undefined;

for (const group of groups) {
  const sum = group.reduce((a, b) => a + b, 0);
  i += sum > previousInput ? 1 : 0;
  previousInput = sum;
}

console.log('Answer Day 1, Part 2: ', i);