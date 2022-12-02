const fs = require('fs');
const buffer = fs.readFileSync('./inputs/Day2.txt');
const inputs = buffer.toString().split('\n');

let x = 0;
let y = 0;

for (const input of inputs) {
  const [direction, amount] = input.split(' ');

  if (direction === 'forward') {
    x += parseInt(amount);
  } else if (direction === 'up') {
    y -= parseInt(amount);
  } else if (direction === 'down') {
    y += parseInt(amount);
  }
}

console.log('Answer Day 2, Part 1: ', x * y);

let aim = 0;
x = 0;
y = 0;

for (const input of inputs) {
  const [direction, amount] = input.split(' ');

  if (direction === 'forward') {
    x += parseInt(amount);
    y += parseInt(amount) * aim;
  } else if (direction === 'up') {
    aim -= parseInt(amount);
  } else if (direction === 'down') {
    aim += parseInt(amount);
  }
}

console.log('Answer Day 2, Part 2: ', x * y);
