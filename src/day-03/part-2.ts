const file = await Deno.readTextFile(new URL('./input.txt', import.meta.url));
const lines = file.split('\n');
const grid = lines.map((line) => line.split(''));

const width = grid[0].length;
const height = grid.length;

let result = 0;

for (let j = 0; j < height; j++) {
  for (let i = 0; i < width; i++) {
    if (grid[j][i] === '*') {
      const matches = [];

      for (let y = j - 1; y <= j + 1; y++) {
        if (y < 0 || y >= height) {
          continue;
        }

        for (let x = i - 1; x <= i + 1; x++) {
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
