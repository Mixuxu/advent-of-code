import fs from 'fs'
const buffer = fs.readFileSync('./2022/inputs/Day7.txt');
const inputs = buffer.toString().split('\n');

const MAX_SIZE = 100000;
const TOTAL_DISK_SPACE = 70000000;
const SPACE_NEEDED = 30000000;

const directoryTree = {};
const currentPath = [];

const addSize = (directory, size) => {
  directory.size += size;
  if (directory.parent) {
    addSize(directory.parent, size);
  }
}

const getCurrentDirectory = () => {
  let directory;
  for (const path of currentPath) {
    directory = directory ? directory.children[path] : directoryTree[path];
  }
  return directory;
}

for (const input of inputs) {
  const commandMatch = input.match(/\$ (cd|ls) ?(\/|\.\.|\w*)?/);
  if (commandMatch) {
    const command = commandMatch[1];
    const path = commandMatch[2];

    if (command === 'cd') {
      if (path === '..') {
        currentPath.pop();
      }
      else {
        const directory = getCurrentDirectory();
        if (!directory) {
          directoryTree[path] = { parent: undefined, children: {}, size: 0 };

        } else {
          directory.children[path] = { parent: directory, children: {}, size: 0 };
        }
        currentPath.push(path);
      }
    } else if (command === 'ls') {
      // ok?
    }
  } else {
    const [, size, _fileName] = input.match(/(\d*|dir) ([\w.]*)/);
    if (size === 'dir') {
      continue;
    }
    const directory = getCurrentDirectory();
    addSize(directory, parseInt(size));
  }
}

let total = 0;
const sumDirectorySizes = (directory) => {
  const dirs = Object.keys(directory);
  for (const dirName of dirs) {
    const dir = directory[dirName];

    if (dir.size <= MAX_SIZE) {
      total += dir.size;
    }
    sumDirectorySizes(dir.children);
  }
}
sumDirectorySizes(directoryTree);

console.log('Answer Day 7, Part 1: ', total);

const rootSize = directoryTree['/'].size;
const spaceToCreate = SPACE_NEEDED - (TOTAL_DISK_SPACE - rootSize);
let currentSmallestDirectoryToDelete = 0;

const getTheThing = (directory) => {
  const dirs = Object.keys(directory);
  for (const dirName of dirs) {
    const dir = directory[dirName];

    if (dir.size >= spaceToCreate) {
      if (!currentSmallestDirectoryToDelete || dir.size < currentSmallestDirectoryToDelete) {
        currentSmallestDirectoryToDelete = dir.size;
      }
    }
    getTheThing(dir.children);
  }
}
getTheThing(directoryTree);

console.log('Answer Day 7, Part 2: ', currentSmallestDirectoryToDelete);