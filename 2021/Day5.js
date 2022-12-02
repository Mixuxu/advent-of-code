const fs = require('fs');
const buffer = fs.readFileSync('./inputs/Day5.txt');
const inputs = buffer.toString().split('\n');

/** Day 5 Part 1 Start **/

let crossedPoints = {};

for (const input of inputs) {
  const [x1y1, x2y2] = input.split(' -> ');
  const [x1,y1] = x1y1.split(',').map(i => parseInt(i));
  const [x2,y2] = x2y2.split(',').map(i => parseInt(i));

  if (x1 === x2) {
    let current = y1 > y2 ? y1 : y2;
    let target = y1 > y2 ? y2 : y1;

    let crossedTimes = crossedPoints[`${x1}-${target}`] || 0;
    crossedTimes += 1;
    crossedPoints[`${x1}-${target}`] = crossedTimes;

    while(current !== target) {
      let crossedTimes = crossedPoints[`${x1}-${current}`] || 0;
      crossedTimes += 1;
      crossedPoints[`${x1}-${current}`] = crossedTimes;
      current--;
    }
  }
  else if (y1 === y2) {
    let current = x1 > x2 ? x1 : x2;
    let target = x1 > x2 ? x2 : x1;

    let crossedTimes = crossedPoints[`${target}-${y2}`] || 0;
    crossedTimes += 1;
    crossedPoints[`${target}-${y2}`] = crossedTimes;

    while(current !== target) {
      let crossedTimes = crossedPoints[`${current}-${y1}`] || 0;
      crossedTimes += 1;
      crossedPoints[`${current}-${y1}`] = crossedTimes;
      current--;
    }
  }
}

let multipleCrossings = 0;
for (const [key, value] of Object.entries(crossedPoints)) {
  if (value > 1) {
    multipleCrossings++;
  }
}
console.log('Answer Day 5, Part 1: ', multipleCrossings);

/** Day 5 Part 2 Start **/

crossedPoints = {};

for (const input of inputs) {
  const [x1y1, x2y2] = input.split(' -> ');
  const [x1,y1] = x1y1.split(',').map(i => parseInt(i));
  const [x2,y2] = x2y2.split(',').map(i => parseInt(i));

  if (x1 === x2) {
    let current = y1 > y2 ? y1 : y2;
    let target = y1 > y2 ? y2 : y1;

    let crossedTimes = crossedPoints[`${x1}-${target}`] || 0;
    crossedTimes += 1;
    crossedPoints[`${x1}-${target}`] = crossedTimes;

    while(current !== target) {
      let crossedTimes = crossedPoints[`${x1}-${current}`] || 0;
      crossedTimes += 1;
      crossedPoints[`${x1}-${current}`] = crossedTimes;
      current--;
    }
  }
  else if (y1 === y2) {
    let current = x1 > x2 ? x1 : x2;
    let target = x1 > x2 ? x2 : x1;

    let crossedTimes = crossedPoints[`${target}-${y2}`] || 0;
    crossedTimes += 1;
    crossedPoints[`${target}-${y2}`] = crossedTimes;

    while(current !== target) {
      let crossedTimes = crossedPoints[`${current}-${y1}`] || 0;
      crossedTimes += 1;
      crossedPoints[`${current}-${y1}`] = crossedTimes;
      current--;
    }
  }
  else {
    let diagonalPoints = x1 > x2 ? x1 - x2 : x2 - x1;
    diagonalPoints += 1;
    let currentX = x1 > x2 ? x1 : x2;
    let currentY = currentX === x1 ? y1 : y2;
    const increaseY = currentX === x1 ? y1 < y2 : y1 > y2;

    while(diagonalPoints) {
      let crossedTimes = crossedPoints[`${currentX}-${currentY}`] || 0;
      crossedTimes += 1;
      crossedPoints[`${currentX}-${currentY}`] = crossedTimes;
      currentX--;
      if (increaseY) {
        currentY++;
      }
      else {
        currentY--;
      }
      diagonalPoints--;
    }
  }
}

multipleCrossings = 0;
for (const [key, value] of Object.entries(crossedPoints)) {
  if (value > 1) {
    multipleCrossings++;
  }
}
console.log('Answer Day 5, Part 2: ', multipleCrossings);
