const fs = require('fs');
const path = require('path');
const buffer = fs.readFileSync(path.resolve(__dirname, './inputs/Day5.txt'));
const inputs = buffer.toString().split('\n');

const stacksInput = inputs.splice(0, 8).reverse();
const rowIndexes = inputs.splice(0, 1)[0]; // ' 1   2   3   4   5   6   7   8   9 '
inputs.shift();

const rowIndexMap = new Map([...rowIndexes].map((rowIndex, i) => {
  if (rowIndex === ' ') {
    return;
  }
  return [rowIndex, i];
}).filter(entry => entry));

const parseStacksFromString = () => {
  const stacksMap = new Map();
  for (const stack of stacksInput) {
    for (const [rowNumber, rowIndex] of rowIndexMap.entries()) {
      const crate = stack.charAt(rowIndex);
      if (crate === ' ') {
        continue;
      }
      const crates = stacksMap.get(rowNumber) || [];
      crates.push(crate);
      stacksMap.set(rowNumber, crates)
    }
  }
  return stacksMap;
}

let stacksMap = parseStacksFromString();

for (const step of inputs) {
  const [, move, from, to] = step.match(/move (\d*) from (\d*) to (\d*)/);
  const crates = stacksMap.get(from);
  const crateToMove = crates.splice(crates.length - parseInt(move), parseInt(move)).reverse();
  stacksMap.get(to).push(...crateToMove);
}

let answer = '';
for (const crates of stacksMap.values()) {
  answer += crates[crates.length - 1];
}

console.log('Answer Day 5, Part 1: ', answer);

stacksMap = parseStacksFromString();

for (const step of inputs) {
  const [, move, from, to] = step.match(/move (\d*) from (\d*) to (\d*)/);
  const crates = stacksMap.get(from);
  const crateToMove = crates.splice(crates.length - parseInt(move), parseInt(move));
  stacksMap.get(to).push(...crateToMove);
}

answer = '';
for (const crates of stacksMap.values()) {
  answer += crates[crates.length - 1];
}

console.log('Answer Day 5, Part 2: ', answer);