import fs from 'fs'
const inputs = fs.readFileSync('./2022/inputs/Day12.txt').toString().split('\n');

function parseGraph() {
  const graph = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    points: {},
  }

  for (const [y, input] of inputs.entries()) {
    for (const [x, point] of [...input].entries()) {
      let elevation;
      if (point === 'S') {
        graph.start.x = x;
        graph.start.y = y;
        elevation = getElevation('a');
      } else if (point === 'E') {
        graph.end.x = x;
        graph.end.y = y;
        elevation = getElevation('z');
      } else {
        elevation = getElevation(point);
      }
      graph.points[`${x}_${y}`] = elevation;
    }
  }
  return graph;
}

function getElevation(point) {
  return (point.charCodeAt(0) - 96);
}

function findShortestPath(part2) {
  const graph = parseGraph();
  if (part2) {
    return dijkstra(graph.points, graph.end);
  }
  return dijkstra(graph.points, graph.start, graph.end);
}

function dijkstra(points, start, end) {
  const distance = {};
  let queue = [];
  for (const point of Object.keys(points)) {
    distance[point] = Infinity;
    queue.push(point);
  }
  distance[`${start.x}_${start.y}`] = 0;

  while (queue.length) {
    let smallestDistancePoint = undefined;
    for (const pointInQue of queue) {
      if (!smallestDistancePoint || distance[pointInQue] < distance[smallestDistancePoint]) {
        smallestDistancePoint = pointInQue;
      }
    }
    queue = queue.filter(pointInQue => pointInQue !== smallestDistancePoint);

    if (!end) {
      if (points[smallestDistancePoint] === getElevation('a')) {
        return distance[smallestDistancePoint]
      }
    } else if (smallestDistancePoint === `${end.x}_${end.y}`) {
      break;
    }

    const neighbors = getPointNeighbors(smallestDistancePoint, points, !end);
    for (const neighbor of neighbors) {
      const alt = distance[smallestDistancePoint] + 1;
      if (alt < distance[neighbor]) {
        distance[neighbor] = alt;
      }
    }
  }
  return distance[`${end.x}_${end.y}`];
}

function getPointNeighbors(point, points, reverse) {
  const [x, y] = point.split('_').map(Number);
  const pointElevation = points[point];

  const traversableNeighbors = [];
  const possibleNeighbors = [`${x + 1}_${y}`, `${x - 1}_${y}`, `${x}_${y + 1}`, `${x}_${y - 1}`];
  for (const possibleNeighbor of possibleNeighbors) {
    const neighborElevation = points[possibleNeighbor];
    if (reverse) {
      if (neighborElevation >= pointElevation - 1) {
        traversableNeighbors.push(possibleNeighbor);
      }
    } else {
      if (neighborElevation <= pointElevation + 1) {
        traversableNeighbors.push(possibleNeighbor);
      }
    }
  }
  return traversableNeighbors;
}

console.log('Answer Day 12, Part 1: ', findShortestPath());
console.log('Answer Day 12, Part 2: ', findShortestPath(true));