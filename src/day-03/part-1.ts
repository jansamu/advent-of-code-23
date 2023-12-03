const file = await Deno.readTextFile(new URL('./input.txt', import.meta.url));
const lines = file.split('\n');
const grid = lines.map((line) => line.split(''));

const width = grid[0].length;
const height = grid.length;

let result = 0;

for (let i = 0; i < height; i++) {
  for (let j = 0; j < height; j++) {
    if (grid[i][j].match(/\d/)) {
      const numStart = j;
      let numLength = 1;
      let numString = grid[i][j];

      while (grid[i][j + 1] && grid[i][j + 1].match(/\d/)) {
        j += 1;
        numLength++;
        numString = numString.concat(grid[i][j]);
      }

      let hasSymbol = false;

      for (let x = numStart - 1; x <= numStart + numLength; x++) {
        if (x < 0 || x >= width) {
          continue;
        }

        for (let y = i - 1; y <= i + 1; y++) {
          if (y < 0 || y >= height) {
            continue;
          }

          if (grid[y][x].match(/[^\d.]/)) {
            hasSymbol = true;
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
