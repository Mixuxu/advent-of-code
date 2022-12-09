import fs from 'fs'
const buffer = fs.readFileSync('./2022/inputs/Day9.txt');
const inputs = buffer.toString().split('\n');

function moveRope(ropeLength) {
  const rope = Array.from({ length: ropeLength }, () => {
    return { x: 0, y: 0 }
  });
  const tailPositions = new Set();

  for (const input of inputs) {
    const [direction, steps] = input.split(' ');

    for (let i = 0; i < parseInt(steps); i++) {
      // Move head of the rope
      if (direction === 'U') {
        rope[0].y++;
      } else if (direction === 'R') {
        rope[0].x++;
      } else if (direction === 'D') {
        rope[0].y--;
      } else if (direction === 'L') {
        rope[0].x--;
      }

      // Move rest of the rope
      for (let j = 1; j < ropeLength; j++) {
        const ropePart = rope[j];
        const ropePartInFront = rope[j - 1];

        if ((ropePartInFront.x < (ropePart.x - 1) || ropePartInFront.x > (ropePart.x + 1)) || (ropePartInFront.y < (ropePart.y - 1) || ropePartInFront.y > (ropePart.y + 1))) {
          if (ropePartInFront.x === ropePart.x) {
            if (ropePartInFront.y > ropePart.y) {
              ropePart.y++;
            } else {
              ropePart.y--;
            }
          } else if (ropePartInFront.y === ropePart.y) {
            if (ropePartInFront.x > ropePart.x) {
              ropePart.x++;
            } else {
              ropePart.x--;
            }
          } else {
            if (ropePartInFront.y > ropePart.y) {
              ropePart.y++;
            } else {
              ropePart.y--;
            }
            if (ropePartInFront.x > ropePart.x) {
              ropePart.x++;
            } else {
              ropePart.x--;
            }
          }
        }
      }
      const tail = rope[ropeLength - 1];
      tailPositions.add(`${tail.x}_${tail.y}`)
    }
  }
  return tailPositions.size;
}

console.log('Answer Day 9, Part 1: ', moveRope(2));
console.log('Answer Day 9, Part 2: ', moveRope(10));