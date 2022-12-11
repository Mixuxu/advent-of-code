import fs from 'fs'
const inputs = fs.readFileSync('./2022/inputs/Day11.txt').toString().split('\n');

function parseMonkeys() {
  const monkeys = [];

  for (let i = 0; i < inputs.length; i += 7) {
    const monkeyId = parseInt(inputs[i].match(/Monkey (\d):/)[1]);
    const startingItems = inputs[i + 1].split('Starting items: ')[1].split(', ').map(Number);
    const operation = inputs[i + 2].split('Operation: new = ')[1];
    const test = parseInt(inputs[i + 3].split('Test: divisible by ')[1]);
    const ifTrue = parseInt(inputs[i + 4].split('If true: throw to monkey ')[1]);
    const ifFalse = parseInt(inputs[i + 5].split('If false: throw to monkey ')[1]);

    monkeys.push({
      monkeyId: monkeyId,
      items: startingItems,
      operation: operation,
      divisibleBy: test,
      ifTrueMonkeyId: ifTrue,
      ifFalseMonkeyId: ifFalse,
      itemsInspected: 0,
    })
  }
  return monkeys;
}


function monkeyBusiness(megaWorry) {
  let monkeys = parseMonkeys();
  const rounds = megaWorry ? 10000 : 20;
  const divider = megaWorry ? 1 : 3;

  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      while(monkey.items.length) {
        monkey.itemsInspected++;
        const item = monkey.items.shift();
        const worryLevel = Math.floor(eval(`(${monkey.operation.replaceAll('old', item)}) / ${divider}`));

        if (!(worryLevel % monkey.divisibleBy)) {
          const targetMonkey = monkeys.find(m => m.monkeyId === monkey.ifTrueMonkeyId);
          targetMonkey.items.push(worryLevel);
        } else {
          const targetMonkey = monkeys.find(m => m.monkeyId === monkey.ifFalseMonkeyId);
          targetMonkey.items.push(worryLevel);
        }
      }
    }
  }
  monkeys = monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
  return monkeys[0].itemsInspected * monkeys[1].itemsInspected;
}

console.log('Answer Day 11, Part 1: ', monkeyBusiness());
console.log('Answer Day 11, Part 2: ', monkeyBusiness(true));

