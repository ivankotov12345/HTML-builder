const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');

const writeFile = fs.createWriteStream(pathToFile);

stdout.write('Write something:\n');

stdin.on('data', (data) => {
  const inputText = data.toString();
  if (inputText.trim() === 'exit') {
    stdout.write('Writing is finished');
    process.exit();
  } else {
    writeFile.write(inputText);
  }
});

process.on('SIGINT', () => {
  stdout.write('Writing is finished');
  process.exit();
});
