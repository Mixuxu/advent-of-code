const fs = require('fs');
const buffer = fs.readFileSync('./2022/inputs/Day3.txt');
const inputs = buffer.toString().split('\n');

const getItemScore = (item) => {
  const charCode = item.charCodeAt();
  if (item === item.toUpperCase()) {
    return (charCode - 38)
  }
  return (charCode - 96)
}

let result = 0;

for (const input of inputs) {
  const inputArray = input.split('');
  const half = inputArray.length / 2;
  const rucksack1 = inputArray.slice(0, half);
  const rucksack2 = inputArray.slice(half);
  const duplicateItem = rucksack1.find(item => rucksack2.includes(item));
  result += getItemScore(duplicateItem);
}

console.log('Answer Day 3, Part 1: ', result);

result = 0;

for (let i = 0; i < inputs.length; i += 3) {
  const elf1 = inputs[i].split('');
  const elf2 = inputs[i + 1].split('');
  const elf3 = inputs[i + 2].split('');
  const duplicateItem = elf1.find(item => elf2.includes(item) && elf3.includes(item));
  result += getItemScore(duplicateItem);
}

console.log('Answer Day 3, Part 2: ', result);