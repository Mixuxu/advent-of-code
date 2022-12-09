import fs from 'fs'
const inputs = fs.readFileSync('./2022/inputs/Day9.txt').toString().split('\n');

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

        if (_shouldMoveRopePart(ropePart, ropePartInFront)) {
          if (ropePartInFront.x === ropePart.x) {
            _moveRopePart(ropePart, ropePartInFront, 'y');
          } else if (ropePartInFront.y === ropePart.y) {
            _moveRopePart(ropePart, ropePartInFront, 'x');
          } else {
            _moveRopePart(ropePart, ropePartInFront, 'y');
            _moveRopePart(ropePart, ropePartInFront, 'x');
          }
        }
      }
      const tail = rope[ropeLength - 1];
      tailPositions.add(`${tail.x}_${tail.y}`)
    }
  }
  return tailPositions.size;
}

function _shouldMoveRopePart(ropePart, ropePartInFront) {
  return (ropePartInFront.x < (ropePart.x - 1) || ropePartInFront.x > (ropePart.x + 1)) ||
         (ropePartInFront.y < (ropePart.y - 1) || ropePartInFront.y > (ropePart.y + 1));
}

function _moveRopePart(ropePart, ropePartInFront, axis) {
  if (ropePartInFront[axis] > ropePart[axis]) {
    ropePart[axis]++;
  } else {
    ropePart[axis]--;
  }
}

console.log('Answer Day 9, Part 1: ', moveRope(2));
console.log('Answer Day 9, Part 2: ', moveRope(10));