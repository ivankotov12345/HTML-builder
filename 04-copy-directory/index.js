const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'files');
const dirCopy = path.join(__dirname, 'files-copy');

const copyDir = async (folder, copyFolder) => {
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
      await copyDir(
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

copyDir(dir, dirCopy);
