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
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five' : '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
};
sum = 0;

for (let input of inputs) {
  for (const [key, value] of Object.entries(stringToNumberMap)) {
    input = input.replace(new RegExp(key, 'g'), `${key}${value}${key}`);
  }
  const match = input.match(/\d/g);
  const firstNumber = match[0];
  const lastNumber = match[match.length - 1];
  sum += parseInt(`${firstNumber}${lastNumber}`);
}

console.log('Answer Day 1, Part 2: ', sum);