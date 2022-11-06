const readline = require('readline');
const fs = require('fs');
const path = require('path');
const process = require('process');

const writteble = fs.createWriteStream(path.join(__dirname, 'text.txt'));

let readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Please, write your text:');

readLine.on('line', (input) => {
  if (input.toLowerCase() == 'exit') {
    console.log('Finished writing to file!');
    readLine.close();
  } else {
    writteble.write(`${input}\n`);
  }
});

readLine.on('SIGINT', () => {
  console.log('Finished writing to file!');
  readLine.close();
});