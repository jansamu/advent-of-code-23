import { resolve } from 'node:path';

const file = await Bun.file(resolve(import.meta.dir, './input.txt')).text();
const lines = file.split('\n');

const maxMap: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const getId = (name: string) => Number(name.split(' ')[1]);

const parseInput = (input: string) => {
  const [name, game] = input.split(': ');
  const id = getId(name);
  const handfuls = game.split('; ');

  return {
    id,
    handfuls,
  };
};

const checkHandfuls = (handfuls: string[]) => {
  for (const handful of handfuls) {
    const counts = handful.split(', ');

    for (const count of counts) {
      const [valueString, colour] = count.split(' ');
      const value = Number(valueString);
      if (value > maxMap[colour]) {
        return false;
      }
    }
  }

  return true;
};

let result = 0;

for (const line of lines) {
  const { id, handfuls } = parseInput(line);
  const passedChecks = checkHandfuls(handfuls);
  if (passedChecks) {
    result += id;
  }
}

console.log(result);
