import fs from 'fs'
const buffer = fs.readFileSync('./2023/inputs/Day1.txt');
const inputs = buffer.toString().split('\n');

let sum = 0;

for (const input of inputs) {
  const match = input.match(/\d/g);
  const firstNumber = match[0];
  const lastNumber = match[match.length - 1];
  sum += parseInt(`${firstNumber}${lastNumber}`);
}

console.log('Answer Day 1, Part 1: ', sum);

const stringToNumberMap = {
  'one': 'n1e',
  'two': 't2o',
  'three': 't3e',
  'four': 'f4r',
  'five' : 'f5e',
  'six': 's6x',
  'seven': 's7n',
  'eight': 'e8t',
  'nine': 'n9e',
};
sum = 0;

for (let input of inputs) {
  for (const [key, value] of Object.entries(stringToNumberMap)) {
    input = input.replace(new RegExp(key, 'g'), value);
  }
  const match = input.match(/\d/g);
  const firstNumber = match[0];
  const lastNumber = match[match.length - 1];
  sum += parseInt(`${firstNumber}${lastNumber}`);
}

console.log('Answer Day 1, Part 2: ', sum);