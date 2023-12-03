const file = await Deno.readTextFile(new URL('./input.txt', import.meta.url));
const lines = file.split('\n');

let result = 0;

for (const line of lines) {
  const first = line.match(/\d/)?.[0];
  const last = line.match(/(\d)\D*$/)?.[1];

  result += Number(`${first}${last}`);
}

console.log(result);
