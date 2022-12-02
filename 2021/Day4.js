const fs = require('fs');
const buffer = fs.readFileSync('./inputs/Day4.txt');
const inputs = buffer.toString().split('\n');
const draws = inputs.shift().split(',').map((i) => parseInt(i));

let tables = [];
let currentTable = undefined;

/** Day 4 Part 1 Start **/

for (const input of inputs) {
  if (!input) {
    tables.push({ x: [], y: [] });
    currentTable = currentTable === undefined ? 0 : currentTable + 1;
  }
  else {
    const xNumbers = input.split(' ').filter((s) => s !== '').map((i) => parseInt(i));
    tables[currentTable].x.push(xNumbers);
    let currentTableY = 0;
    for (const xNumber of xNumbers) {
      const y = tables[currentTable].y[currentTableY] || [];
      y.push(xNumber);
      tables[currentTable].y[currentTableY] = y;
      currentTableY++;
    }
  }
}

theMegaLoop:
for (const draw of draws) {
  for (const table of tables) {
    let winner = false;

    for (const x of table.x) {
      if (x.includes(draw)) {
        x.splice(x.indexOf(draw), 1);
        if (x.length === 0) {
          winner = true;
          break;
        }
      }
    }

    if (winner) {
      let winnerSum = 0;
      for (const x of table.x) {
        winnerSum += x.reduce((a, b) => a + b, 0);
      }
      console.log('Answer Day 4, Part 1: ', winnerSum * draw);
      break theMegaLoop;
    }
    else {
      for (const y of table.y) {
        if (y.includes(draw)) {
          y.splice(y.indexOf(draw), 1);
          if (y.length === 0) {
            winner = true;
            break;
          }
        }
      }
    }

    if (winner) {
      let winnerSum = 0;
      for (const x of table.x) {
        winnerSum += x.reduce((a, b) => a + b, 0);
      }
      console.log('Answer Day 4, Part 1: ', winnerSum * draw);
      break theMegaLoop;
    }
  }
}

/** Day 4 Part 2 Start **/

tables = [];
currentTable = undefined;

for (const input of inputs) {
  if (!input) {
    tables.push({ x: [], y: [] });
    currentTable = currentTable === undefined ? 0 : currentTable + 1;
  }
  else {
    const xNumbers = input.split(' ').filter((s) => s !== '').map((i) => parseInt(i));
    tables[currentTable].x.push(xNumbers);
    let currentTableY = 0;
    for (const xNumber of xNumbers) {
      const y = tables[currentTable].y[currentTableY] || [];
      y.push(xNumber);
      tables[currentTable].y[currentTableY] = y;
      currentTableY++;
    }
  }
}

const winningTables = [];
const ignore = [];

for (const draw of draws) {
  for (const [i, table] of tables.entries()) {
    if (!ignore.includes(i)) {
      let winner = false;

      for (const x of table.x) {
        if (x.includes(draw)) {
          x.splice(x.indexOf(draw), 1);
          if (x.length === 0) {
            winner = true;
            break;
          }
        }
      }

      if (winner) {
        winningTables.push({...table, draw});
        ignore.push(i);
        continue;
      }
      else {
        for (const y of table.y) {
          if (y.includes(draw)) {
            y.splice(y.indexOf(draw), 1);
            if (y.length === 0) {
              winner = true;
              break;
            }
          }
        }
      }

      if (winner) {
        winningTables.push({...table, draw});
        ignore.push(i);
      }
    }
  }
}

let winnerSum = 0;
const lastWinningTable = winningTables[winningTables.length - 1];
for (const x of lastWinningTable.x) {
  winnerSum += x.reduce((a, b) => a + b, 0);
}
console.log('Answer Day 4, Part 2: ', winnerSum * lastWinningTable.draw);