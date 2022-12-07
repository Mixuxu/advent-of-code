const fs = require('fs');
const buffer = fs.readFileSync('./2022/inputs/Day6.txt');
const input = buffer.toString();

const findMarker = (n) => {
  for (let i = 0; i < input.length; i++) {
    const subst = input.substring(i, i + n);
    if (new Set([...subst]).size === n) {
      return i + n;
    }
  }
}

console.log('Answer Day 6, Part 1: ', findMarker(4));
console.log('Answer Day 6, Part 2: ', findMarker(14));