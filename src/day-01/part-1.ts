import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { resolve } from 'node:path';

const main = async () => {
  const fileStream = createReadStream(resolve(__dirname, './input.txt'), 'utf-8');
  const rl = createInterface({
    input: fileStream,
  });

  let result = 0;

  for await (const line of rl) {
    const first = line.match(/\d/)?.[0];
    const last = line.match(/(\d)\D*$/)?.[1];

    result += Number(`${first}${last}`);
  }

  console.log(result);
};

main();
