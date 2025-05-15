const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Base directory of your project’s src folder
const projectSrc = path.resolve(__dirname, '..');

// Directories to scan for potential unused files
const dirsToScan = [
  path.join(projectSrc, 'components'),
  path.join(projectSrc, 'content'),
  path.join(projectSrc, 'hooks'),
  path.join(projectSrc, 'types'),
  path.join(projectSrc, 'utils'),
];

// Recursively collect all file paths under a directory
function getAllFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach((entry) => {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

console.log('Finding potentially unused files...');

let allFiles = [];
for (const dir of dirsToScan) {
  if (fs.existsSync(dir)) {
    allFiles = allFiles.concat(getAllFiles(dir));
  } else {
    console.warn(`Warning: directory not found: ${dir}`);
  }
}

allFiles.forEach((file) => {
  const fileName = path.basename(file);
  const baseName = fileName.split('.')[0];

  // Skip index and core type/util files
  if (['index', 'types', 'utils'].includes(baseName)) return;

  // Grep for any reference to the baseName in your src tree
  exec(
    `grep -R "${baseName}" --include="*.{ts,tsx,js,jsx}" ${projectSrc}`,
    (err, stdout) => {
      if (err && !stdout) {
        // grep error (no matches) → definitely unused
        console.log(`Potentially unused file: ${file}`);
      } else {
        const matches = stdout
          .split('\n')
          .filter((line) => line.trim() && !line.includes(file));
        if (matches.length === 0) {
          console.log(`Potentially unused file: ${file}`);
        }
      }
    }
  );
});
