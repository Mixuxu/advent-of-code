import fs from 'fs'
const buffer = fs.readFileSync('./2022/inputs/Day8.txt');
const inputs = buffer.toString().split('\n');

const treeMatrix = new Map();

let y = 0;
for (const treeRow of inputs) {
  let x = 0;
  for (const tree of treeRow.split('').map(tree => parseInt(tree))) {
    treeMatrix.set(`${x}_${y}`, tree);
    x++;
  }
  y++;
}

let visibleTrees = 0;
for (const [matrix, height] of treeMatrix.entries()) {
  if (isVisible(matrix, height)) {
    visibleTrees++;
  }
}

function isVisible(matrix, height) {
  const [x, y] = matrix.split('_').map(v => parseInt(v));

  // Left
  let isVisible = true;
  for (let i = (x - 1); i >= 0; i--) {
    if (treeMatrix.get(`${i}_${y}`) >= height) {
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
    if (treeMatrix.get(`${x}_${i}`) >= height) {
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
    if (treeMatrix.get(`${i}_${y}`) >= height) {
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
    if (treeMatrix.get(`${x}_${i}`) >= height) {
      isVisible = false;
      break;
    }
  }
  return isVisible;
}

console.log('Answer Day 8, Part 1: ', visibleTrees);

let highestScenicScore = 0;
for (const [matrix, tree] of treeMatrix.entries()) {
  const scenicScore = getScenicScore(matrix, tree);
  if (scenicScore > highestScenicScore) {
    highestScenicScore = scenicScore;
  }
}

function getScenicScore(matrix, tree) {
  const [x, y] = matrix.split('_').map(v => parseInt(v));

  // Left
  let treesVisibleToTheLeft = 0;
  for (let i = (x - 1); i >= 0; i--) {
    const currentTree = treeMatrix.get(`${i}_${y}`);
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
    const currentTree = treeMatrix.get(`${x}_${i}`);
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
    const currentTree = treeMatrix.get(`${i}_${y}`);
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
    const currentTree = treeMatrix.get(`${x}_${i}`);
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