import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { resolve } from 'node:path';

const parseInput = (input: string) => {
  const [_, game] = input.split(': ');
  const handfuls = game.split('; ');

  return handfuls;
};

const checkHandfuls = (handfuls: string[]) => {
  const minMap: Record<string, number> = {};
  for (const handful of handfuls) {
    const counts = handful.split(', ');

    for (const count of counts) {
      const [valueString, colour] = count.split(' ');
      const value = Number(valueString);
      if (!minMap[colour] || value > minMap[colour]) {
        minMap[colour] = value;
      }
    }
  }

  return Object.values(minMap).reduce((acc, curr) => acc * curr, 1);
};

(async () => {
  const fileStream = createReadStream(resolve(__dirname, './input.txt'), 'utf-8');
  const rl = createInterface({
    input: fileStream,
  });

  let result = 0;

  for await (const line of rl) {
    const handfuls = parseInput(line);
    const count = checkHandfuls(handfuls);
    result += count;
  }

  console.log(result);
})();
