const file = await Deno.readTextFile(new URL('./input.txt', import.meta.url));
const lines = file.split('\n');

let result = 0;

for (const line of lines) {
  let game = line.split(': ');
  game = game[1].split(' | ');

  const winningSet = new Set(game[0].trim().split(/\s+/).map(Number));
  const gameSet = game[1].trim().split(/\s+/).map(Number);

  let match = 0;

  for (let value of gameSet) {
    if (winningSet.has(value)) {
      match++;
    }
  }

  if (match) {
    result += Math.pow(2, match - 1);
  }
}

console.log(result);
