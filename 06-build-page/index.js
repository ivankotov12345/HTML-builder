const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'assets');
const dirCopy = path.join(__dirname, 'project-dist', 'assets');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) {
    console.log(err);
  }
});

const makeIndex = () => {
  const distInd = new fs.WriteStream(
    path.join(__dirname, 'project-dist', 'index.html'),
  );
  const readInd = new fs.ReadStream(
    path.join(__dirname, 'template.html'),
    'utf-8',
  );

  let indData = '';

  readInd.on('data', (chunk) => (indData += chunk));
  readInd.on('end', () => {
    fs.readdir(path.join(__dirname, 'components'), (err, componentsInd) => {
      if (err) {
        console.log(err);
      } else {
        let flag = 1;
        componentsInd.forEach((component) => {
          const rsInd = new fs.ReadStream(
            path.join(__dirname, 'components', component),
            'utf-8',
          );
          rsInd.on('data', (chunk) => {
            indData = indData.replace(
              `{{${path.basename(component, '.html')}}}`,
              chunk,
            );
          });
          rsInd.on('end', () => {
            if (flag === componentsInd.length) {
              distInd.write(indData);
            } else {
              flag += 1;
            }
          });
        });
      }
    });
  });
};

makeIndex();

const makeStyles = () => {
  const dirStylesPath = path.join(__dirname, 'styles');
  const newFileStylePath = path.join(__dirname, 'project-dist', 'style.css');

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
};

makeStyles();

const assetsCopy = async (folder, copyFolder) => {
  await fs.promises.rm(copyFolder, { recursive: true, force: true });
  await fs.promises.mkdir(copyFolder, { recursive: true });
  let files = await fs.promises.readdir(
    folder,
    { withFileTypes: true },
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );

  for (let file of files) {
    if (file.isDirectory()) {
      await assetsCopy(
        path.join(folder, file.name),
        path.join(copyFolder, file.name),
      );
    } else {
      await fs.promises.copyFile(
        path.join(folder, file.name),
        path.join(copyFolder, file.name),
      );
    }
  }
};

assetsCopy(dir, dirCopy);
