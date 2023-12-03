import { resolve } from 'node:path';

const file = await Bun.file(resolve(import.meta.dir, './input.txt')).text();
const lines = file.split('\n');
const grid = lines.map((line) => line.split(''));

const width = grid[0].length;
const height = grid.length;

let result = 0;

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    if (grid[i][j] === '*') {
      const matches = [];

      for (let y = i - 1; y <= i + 1; y++) {
        if (y < 0 || y >= height) {
          continue;
        }

        for (let x = j - 1; x <= j + 1; x++) {
          if (x < 0 || x >= width) {
            continue;
          }

          if (grid[y][x].match(/\d/)) {
            // Find the start of the number
            while (grid[y][x - 1] && grid[y][x - 1].match(/\d/)) {
              x -= 1;
            }

            let numString = grid[y][x];

            while (grid[y][x + 1] && grid[y][x + 1].match(/\d/)) {
              x += 1;
              numString = numString.concat(grid[y][x]);
            }

            matches.push(Number(numString));
          }
        }
      }

      if (matches.length === 2) {
        result += matches[0] * matches[1];
      }
    }
  }
}

console.log(result);
