import fs from 'fs'
const buffer = fs.readFileSync('./2021/inputs/Day3.txt');
const inputs = buffer.toString().split('\n');

/** Day 3 Part 1 Start **/

const arrays = [];
for (const input of inputs) {
  const splitInput = input.split('');
  let i = 0;
  for (const bit of splitInput) {
    if (!arrays[i]) {
      arrays[i] = [];
    }
    arrays[i].push(parseInt(bit));
    i++;
  }
}

const counts = [];
for (const bitArray of arrays) {
  const count = {};
  for (let bit of bitArray) {
    count[bit] = (count[bit] + 1) || 1;
  }
  counts.push(count);
}
let gammaRate = '';
let epsilonRate = '';

for (const count of counts) {
  if (count['0'] > count['1']) {
    gammaRate += '0';
    epsilonRate += '1';
  }
  else {
    gammaRate += '1';
    epsilonRate += '0';
  }
}
console.log('Answer Day 3, Part 1: ',
  parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
);

/** Day 3 Part 2 Start **/

let bitXArrays = [];
let bitYArrays = [];
for (const input of inputs) {
  const splitInput = input.split('').map((num) => parseInt(num));
  bitXArrays.push({ bits: splitInput });
  bitYArrays.push(splitInput[0]);
}

const oxygenRating = getOxygenRating(bitXArrays, bitYArrays);
const co2Rating = getCO2Rating(bitXArrays, bitYArrays);

console.log('Answer Day 3, Part 2: ',
  parseInt(co2Rating, 2) * parseInt(oxygenRating, 2)
);

function _getCount(array) {
  const count = {};
  for (let bit of array) {
    count[bit] = (count[bit] + 1) || 1;
  }
  return count;
}

function help(bit, i, xArray, nextArray) {
  xArray = xArray.filter((val) => {
    return val.bits[i] === bit;
  });
  for (const input of xArray) {
    nextArray.push(input.bits[i + 1]);
  }
  return xArray;
}

function getOxygenRating(xArray, yArray) {
  let xArrayCopy = [...xArray];
  let nextArray = [...yArray];
  let i = 0;

  while (nextArray) {
    const count = _getCount(nextArray);
    if (count['0'] > count['1']) {
      nextArray = [];
      xArrayCopy = help(0, i, xArrayCopy, nextArray);
    } else if (count['0'] <= count['1']) {
      nextArray = [];
      xArrayCopy = help(1, i, xArrayCopy, nextArray);
    }
    if (nextArray.length === 1) {
      nextArray = undefined;
    }
    i++;
  }
  return xArrayCopy[0].bits.join('');
}

function getCO2Rating(xArray, yArray) {
  let xArrayCopy = [...xArray];
  let nextArray = [...yArray];
  let i = 0;

  while (nextArray) {
    const count = _getCount(nextArray);
    if (count['0'] <= count['1']) {
      nextArray = [];
      xArrayCopy = help(0,i, xArrayCopy, nextArray);
    } else if (count['0'] > count['1']) {
      nextArray = [];
      xArrayCopy = help(1,i, xArrayCopy, nextArray);
    }
    if (nextArray.length === 1) {
      nextArray = undefined;
    }
    i++;
  }
  return xArrayCopy[0].bits.join('');
}