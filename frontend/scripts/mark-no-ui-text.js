const fs = require('fs');
const path = require('path');

// Get file to mark
const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a file path');
  process.exit(1);
}

// Read migration progress
const progressPath = path.resolve(__dirname, 'migration-progress.json');
const progress = JSON.parse(fs.readFileSync(progressPath, 'utf8'));

// Remove from notMigrated and add to noStrings
const relPath = filePath.startsWith('/')
  ? path.relative(path.resolve(__dirname, '..'), filePath)
  : filePath;

const index = progress.notMigrated.indexOf(relPath);
if (index !== -1) {
  progress.notMigrated.splice(index, 1);
  if (!progress.noStrings.includes(relPath)) {
    progress.noStrings.push(relPath);
  }

  fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2), 'utf8');
  console.log(`Marked "${relPath}" as having no UI text to migrate`);
} else {
  console.log(`File "${relPath}" not found in notMigrated list`);
}
