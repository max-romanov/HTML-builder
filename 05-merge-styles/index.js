const fsPromises = require('fs/promises');
const path = require('path');

const srcFolder = path.join(__dirname, 'styles');
const destBundle = path.join(__dirname, 'project-dist', 'bundle.css');

async function createBundleCSS(srcFolder, destBundle) {
  let arr = [];
  const cssFiles = await fsPromises.readdir(srcFolder, { withFileTypes: true });

  for (const file of cssFiles) {
    if (file.isFile() && path.extname(file.name) == '.css') {
      arr.push(
        `/* ${file.name} */\n\n` +
        await fsPromises.readFile(path.join(srcFolder, file.name), 'utf-8')
      );
    }
  }
  fsPromises.writeFile(destBundle, arr.join('\n\n'));
};

createBundleCSS(srcFolder, destBundle);