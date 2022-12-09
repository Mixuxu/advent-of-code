import fs from 'fs'
const buffer = fs.readFileSync('./2022/inputs/Day8.txt');
const inputs = buffer.toString().split('\n');

const trees = new Map();

let y = 0;
for (const treeRow of inputs) {
  let x = 0;
  for (const tree of treeRow.split('').map(tree => parseInt(tree))) {
    trees.set(`${x}_${y}`, tree);
    x++;
  }
  y++;
}

let visibleTrees = 0;
for (const [position, height] of trees.entries()) {
  if (isVisible(position, height)) {
    visibleTrees++;
  }
}

function isVisible(position, height) {
  const [x, y] = position.split('_').map(v => parseInt(v));

  // Left
  let isVisible = true;
  for (let i = (x - 1); i >= 0; i--) {
    if (trees.get(`${i}_${y}`) >= height) {
      isVisible = false;
      break;
    }
  }

  if (isVisible) {
    return true;
  }

  // Top
  isVisible = true;
  for (let i = (y - 1); i >= 0; i--) {
    if (trees.get(`${x}_${i}`) >= height) {
      isVisible = false;
      break;
    }
  }

  if (isVisible) {
    return true;
  }

  // Right
  isVisible = true;
  for (let i = (x + 1); i <= 99; i++) {
    if (trees.get(`${i}_${y}`) >= height) {
      isVisible = false;
      break;
    }
  }

  if (isVisible) {
    return true;
  }

  // Bottom
  isVisible = true;
  for (let i = (y + 1); i <= 99; i++) {
    if (trees.get(`${x}_${i}`) >= height) {
      isVisible = false;
      break;
    }
  }
  return isVisible;
}

console.log('Answer Day 8, Part 1: ', visibleTrees);

let highestScenicScore = 0;
for (const [position, tree] of trees.entries()) {
  const scenicScore = getScenicScore(position, tree);
  if (scenicScore > highestScenicScore) {
    highestScenicScore = scenicScore;
  }
}

function getScenicScore(position, tree) {
  const [x, y] = position.split('_').map(v => parseInt(v));

  // Left
  let treesVisibleToTheLeft = 0;
  for (let i = (x - 1); i >= 0; i--) {
    const currentTree = trees.get(`${i}_${y}`);
    if (currentTree === undefined) {
      break;
    }
    treesVisibleToTheLeft++;
    if (currentTree >= tree) {
      break;
    }
  }

  // Top
  let treesVisibleToTheTop = 0;
  for (let i = (y - 1); i >= 0; i--) {
    const currentTree = trees.get(`${x}_${i}`);
    if (currentTree === undefined) {
      break;
    }
    treesVisibleToTheTop++;
    if (currentTree >= tree) {
      break;
    }
  }

  // Right
  let treesVisibleToTheRight = 0;
  for (let i = (x + 1); i <= 99; i++) {
    const currentTree = trees.get(`${i}_${y}`);
    if (currentTree === undefined) {
      break;
    }
    treesVisibleToTheRight++;
    if (currentTree >= tree) {
      break;
    }
  }

  // Bottom
  let treesVisibleToTheBottom = 0;
  for (let i = (y + 1); i <= 99; i++) {
    const currentTree = trees.get(`${x}_${i}`);
    if (currentTree === undefined) {
      break;
    }
    treesVisibleToTheBottom++;
    if (currentTree >= tree) {
      break;
    }
  }
  return treesVisibleToTheLeft * treesVisibleToTheTop * treesVisibleToTheRight * treesVisibleToTheBottom;
}

console.log('Answer Day 8, Part 2: ', highestScenicScore);