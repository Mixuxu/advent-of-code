import fs from 'fs'
const buffer = fs.readFileSync('./2021/inputs/Day6.txt');
const inputs = buffer.toString().split(',').map(i => parseInt(i));

let inputsCopy = [...inputs];

for(let i = 0; i < 80; i++) {
  const fishToAdd = [];
  inputsCopy = inputsCopy.map((input) => {
    let newInput;
    if (input === 0) {
      newInput = 6;
      fishToAdd.push(8);
    }
    else {
      newInput = input - 1;
    }
    return newInput;
  });
  inputsCopy = [...inputsCopy, ...fishToAdd];
}
console.log('Answer Day 6, Part 1: ', inputsCopy.length);

// Above 'solution' chugs on 256 days :D rip laptop

inputsCopy = [...inputs];

const fish = {
  '0': 0,
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '6': 0,
  '7': 0,
  '8': 0,
};

inputsCopy.forEach(fishTimer => {
  fish[fishTimer]++;
});

for (let i = 0; i < 256; i++) {
  const fishAtZero = fish['0'];
  for (let j = 0; j < 8; j++) {
    fish[j] = fish[j + 1];
  }
  fish['8'] = fishAtZero;
  fish['6'] += fishAtZero;
}
const answer = Object.values(fish).reduce((accu, curr) => accu + curr);
console.log('Answer Day 6, Part 2: ', answer);

