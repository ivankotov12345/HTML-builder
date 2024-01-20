const { stdout } = process;

const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFile, { withFileTypes: true }, (err, data) => {
  if (err) {
    console.log(err);
  }

  data.forEach((el) => {
    const extensionName = path.extname(el.name);
    const pathToEl = path.join(pathToFile, el.name);
    if (el.isFile()) {
      fs.stat(pathToEl, (err, stat) => {
        if (err) {
          console.log(err);
        }
        const sizeFile = stat.size / 1024;
        stdout.write(
          `${el.name.split('.')[0]} - ${extensionName.slice(
            1,
          )} - ${sizeFile}kb\n`,
        );
      });
    }
  });
});
