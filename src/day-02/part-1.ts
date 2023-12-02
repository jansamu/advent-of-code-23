import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { resolve } from 'node:path';

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

(async () => {
  const fileStream = createReadStream(resolve(__dirname, './input.txt'));
  const rl = createInterface({
    input: fileStream,
  });

  let result = 0;

  for await (const line of rl) {
    const { id, handfuls } = parseInput(line);
    const passedChecks = checkHandfuls(handfuls);
    if (passedChecks) {
      result += id;
    }
  }

  console.log(result);
})();
