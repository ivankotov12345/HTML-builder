const fs = require('fs');
const path = require('path');

const dirStylesPath = path.join(__dirname, 'styles');
const newFileStylePath = path.join(__dirname, 'project-dist', 'bundle.css');

const output = fs.createWriteStream(newFileStylePath, 'utf-8');

fs.readdir(dirStylesPath, { withFileTypes: true }, (err, data) => {
  if (err) {
    console.log(err);
  }
  data.forEach((el) => {
    if (el.isFile()) {
      if (path.extname(el.name) === '.css') {
        const lol = path.join(dirStylesPath, el.name);
        const read = fs.createReadStream(lol, 'utf-8');
        read.pipe(output);
      }
    }
  });
});
