const file = await Deno.readTextFile(new URL('./input.txt', import.meta.url));
const lines = file.split('\n');
const grid = lines.map((line) => line.split(''));

const width = grid[0].length;
const height = grid.length;

let result = 0;

for (let j = 0; j < height; j++) {
  for (let i = 0; i < height; i++) {
    if (grid[j][i].match(/\d/)) {
      let numString = grid[j][i];

      while (grid[j][i + 1] && grid[j][i + 1].match(/\d/)) {
        numString = numString.concat(grid[j][++i]);
      }

      let hasSymbol = false;

      for (let x = i - numString.length; x <= i + 1; x++) {
        if (hasSymbol) {
          break;
        }

        if (x < 0 || x >= width) {
          continue;
        }

        for (let y = j - 1; y <= j + 1; y++) {
          if (y < 0 || y >= height) {
            continue;
          }

          if (grid[y][x].match(/[^\d.]/)) {
            hasSymbol = true;
            break;
          }
        }
      }

      if (hasSymbol) {
        result += Number(numString);
      }
    }
  }
}

console.log(result);
