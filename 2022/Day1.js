import fs from 'fs'
const buffer = fs.readFileSync('./2022/inputs/Day1.txt');
const inputs = buffer.toString().split('\n').map((input) => parseInt(input));

const elfCalories = new Map();
let elfIndex = 1;

for (const input of inputs) {
  if (!input) {
    elfIndex++;
    continue;
  }
  let calories = elfCalories.get(elfIndex) || 0;
  calories += input;
  elfCalories.set(elfIndex, calories);
}

console.log('Answer Day 1, Part 1: ', Math.max(...elfCalories.values()));

const sortedCalories = [...elfCalories.values()].sort((a, b) => b - a);
const top3 = sortedCalories.slice(0, 3);
let sum = 0;
for (const c of top3) {
  sum += c;
}

console.log('Answer Day 1, Part 2: ', sum);