import { writeFile } from 'node:fs/promises';

let message: string;
message = 'Hi There';
console.log(message);

const text = 'This is a test - and it should be stored in a file';

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile('./files/test.txt', data).then(() => {
  console.log('Wrote to a file');
});

writeFile('./files/node-test.txt', text);
