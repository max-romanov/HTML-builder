const path = require('path');
const fsPromises = require('fs/promises')

const source = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

copyFiles(source, dest)
async function copyFiles (source, dest) {
  try {
    await fsPromises.rm(dest, { recursive: true, force: true });
    await fsPromises.mkdir(dest);
    const files = await fsPromises.readdir(source, {withFileTypes: true});
    files.forEach(file => {
      if (file.isDirectory()) {
        copyFiles(
          path.join(source, file.name),
          path.join(dest, file.name)
        );
      } else {
        fsPromises.copyFile(
          path.join(source, file.name),
          path.join(dest, file.name)
        );
      }
    });
  } catch (error) {
    console.error(error);
  }
};