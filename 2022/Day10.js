import fs from 'fs'
const inputs = fs.readFileSync('./2022/inputs/Day10.txt').toString().split('\n');

const reportingCycles = [20, 60, 100, 140, 180, 220];
const signalStrengths = [];

let x = 1;
let cycle = 0;
for (const input of inputs) {
  const [instruction, modifier] = input.split(' ');

  if (instruction === 'noop') {
    cycle++;
  } else {
    cycle++;
    if (reportingCycles.includes(cycle)) {
      signalStrengths.push((cycle * x))
    }
    cycle++;
  }
  if (reportingCycles.includes(cycle)) {
    signalStrengths.push((cycle * x))
  }

  if (modifier) {
    x += parseInt(modifier);
  }
}

console.log('Answer Day 9, Part 1: ', signalStrengths.reduce((sum, x) => sum + x));

const renderingCycles = [40, 80, 120, 160, 200, 240];
let render = '';
let renderer = 0;
x = 1;
cycle = 0;


function drawPixel() {
  if ([x-1, x, x+1].includes(renderer)) {
    render += '#'
  }
  else {
    render += '.'
  }
}

for (const input of inputs) {
  const [instruction, modifier] = input.split(' ');

  if (instruction === 'noop') {
    cycle++;
    drawPixel();
    renderer++;
  } else {
    cycle++;
    drawPixel();
    renderer++;
    if (renderingCycles.includes(cycle)) {
      console.log('Answer Day 9, Part 2:', render);
      render = '';
      renderer = 0;
    }
    cycle++;
    drawPixel();
    renderer++;
  }
  if (renderingCycles.includes(cycle)) {
    console.log('Answer Day 9, Part 2:', render);
    render = '';
    renderer = 0;
  }

  if (modifier) {
    x += parseInt(modifier);
  }
}

/*
  Answer Day 9, Part 2: ####.###..#..#.###..#..#.####..##..#..#.
  Answer Day 9, Part 2: #....#..#.#..#.#..#.#..#....#.#..#.#..#.
  Answer Day 9, Part 2: ###..###..#..#.#..#.####...#..#....####.
  Answer Day 9, Part 2: #....#..#.#..#.###..#..#..#...#....#..#.
  Answer Day 9, Part 2: #....#..#.#..#.#.#..#..#.#....#..#.#..#.
  Answer Day 9, Part 2: #....###...##..#..#.#..#.####..##..#..#.
*/