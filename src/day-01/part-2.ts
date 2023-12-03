const file = await Deno.readTextFile(new URL('./input.txt', import.meta.url));
const lines = file.split('\n');

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

const digitRegexp = new RegExp(
  `(?=(\\d|${Object.keys(digitMap).join('|')}))`,
  'g'
);

const parseDigit = (digit: string | undefined) => {
  if (digit && digitMap[digit]) {
    return digitMap[digit];
  }
  return digit;
};

let result = 0;

for (const line of lines) {
  const matches = Array.from(line.matchAll(digitRegexp), (m) => m[1]);
  const first = parseDigit(matches[0]);
  const last = parseDigit(matches[matches.length - 1]);

  result += Number(`${first}${last}`);
}

console.log(result);
