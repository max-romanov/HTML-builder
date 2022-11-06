const fsPromises = require('fs/promises');
const path = require('path');

const dest = path.join(__dirname, 'project-dist');
const srcHtml = path.join(__dirname, 'template.html');
const srcFolder = path.join(__dirname, 'components');
const destHtml = path.join(dest, 'index.html');
const srcCssFolder = path.join(__dirname, 'styles');
const destCssBundle = path.join(dest, 'style.css');
const sourceAssets = path.join(__dirname, 'assets');
const destAssets = path.join(dest, 'assets');

createBuild()
async function createBuild() {
  await fsPromises.rm(dest, {force: true, recursive: true});
  await fsPromises.mkdir(dest, {recursive: true});
  await createHtml(srcFolder, srcHtml, destHtml);
  await createBundleCSS(srcCssFolder, destCssBundle);
  await copyFiles(sourceAssets, destAssets)
}

async function createHtml(srcFolder, srcHtml, destHtml) {
  let htmlText = '';
  const componentFiles = await fsPromises.readdir(srcFolder, { withFileTypes: true });
  htmlText = await fsPromises.readFile(srcHtml, {encoding: 'utf-8'});

  for (const file of componentFiles) {
    if (file.isFile() && path.extname(file.name) == '.html') {
      const componentHtml = await fsPromises.readFile(path.join(srcFolder, file.name), 'utf-8');
      htmlText = htmlText.replace(`{{${path.parse(file.name).name}}}`, componentHtml);
      if(file === componentFiles[componentFiles.length - 1]) {
        await fsPromises.writeFile(destHtml, htmlText);
      }
    }
  }
};

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