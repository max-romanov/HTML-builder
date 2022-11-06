const fsPromises = require('fs/promises');
const path = require('path');

const dir = path.join(__dirname, 'secret-folder');

readDirectory(dir);
async function readDirectory (dir) {
  const files = await fsPromises.readdir(dir, { withFileTypes: true })
    .then(files => files.filter(file => file.isFile()));
  
  files.forEach(file => 
    fsPromises.stat(path.join(dir, file.name))
      .then(stat => 
        console.log(`${path.parse(file.name).name} - ${path.extname(file.name).slice(1)} - ${stat.size}`)
      )
  )
}