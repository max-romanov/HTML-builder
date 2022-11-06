const path = require('path');
const fs = require('fs');
const process = require('process');

const file = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(file, 'utf-8');

stream.pipe(process.stdout);
stream.on('error', (err) => {
  process.stdout.write(err.message);
});
process.on('exit', () => process.stdout.write('\n'));