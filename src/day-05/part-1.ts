const file = await Deno.readTextFile(new URL('./input.txt', import.meta.url));

const sections = file.split('\n\n');

const [seedsString, ...mapsStrings] = sections;

const seeds = seedsString.split(' ').slice(1).map(Number);
const rangeSets = mapsStrings.map((mapString) =>
  mapString
    .split('\n')
    .slice(1)
    .map((line) => line.split(' ').map(Number))
);

let result = Infinity;

for (const seed of seeds) {
  let current = seed;

  for (const rangeSet of rangeSets) {
    for (const range of rangeSet) {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = range;
      if (
        current >= sourceRangeStart &&
        current < sourceRangeStart + rangeLength
      ) {
        current = destinationRangeStart + (current - sourceRangeStart);
        break;
      }
    }
  }

  result = Math.min(result, current);
}

console.log(result);
