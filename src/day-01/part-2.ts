import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { resolve } from 'node:path';

const digitMap: Record<string, string> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const digitRegexp = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

const parseDigit = (digit: string | undefined) => {
  if (digit && digitMap.hasOwnProperty(digit)) {
    return digitMap[digit];
  }
  return digit;
};

(async () => {
  const fileStream = createReadStream(resolve(__dirname, './input.txt'), 'utf-8');
  const rl = createInterface({
    input: fileStream,
  });

  let result = 0;

  for await (const line of rl) {
    const matches = Array.from(line.matchAll(digitRegexp), m => m[1]);
    const first = parseDigit(matches[0]);
    const last = parseDigit(matches[matches.length - 1]);

    result += Number(`${first}${last}`);
  }

  console.log(result);
})();
