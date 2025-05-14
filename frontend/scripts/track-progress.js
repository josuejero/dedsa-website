const fs = require('fs');
const path = require('path');

// Determine the right directory
const findProgressFile = () => {
  const possibleLocations = [
    path.join(process.cwd(), 'migration-progress.json'),
    path.join(process.cwd(), 'scripts', 'migration-progress.json'),
    path.join(process.cwd(), '..', 'scripts', 'migration-progress.json'),
  ];

  for (const location of possibleLocations) {
    if (fs.existsSync(location)) {
      return location;
    }
  }

  console.error('Could not find migration-progress.json');
  process.exit(1);
};

const progressFile = findProgressFile();
const progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));

const total = progress.total;
const migrated = progress.migrated.length;
const noStrings = progress.noStrings.length;
const remaining = progress.notMigrated.length;
const completionRate = (((migrated + noStrings) / total) * 100).toFixed(2);

console.log('\n==== String Migration Progress ====');
console.log(`Total files: ${total}`);
console.log(
  `Files migrated: ${migrated} (${((migrated / total) * 100).toFixed(2)}%)`
);
console.log(
  `Files with no strings: ${noStrings} (${((noStrings / total) * 100).toFixed(2)}%)`
);
console.log(
  `Files remaining: ${remaining} (${((remaining / total) * 100).toFixed(2)}%)`
);
console.log(`Overall completion: ${completionRate}%`);
console.log('===================================');

console.log('\nNext 5 files to migrate:');
progress.notMigrated.slice(0, 5).forEach((file, i) => {
  console.log(`${i + 1}. ${file}`);

  // Try to find and suggest the number of strings in the file
  try {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const singleQuotes = content.match(/'([^'\n]{5,})'/g) || [];
      const doubleQuotes = content.match(/"([^"\n]{5,})"/g) || [];
      console.log(
        `   Estimated strings: ~${singleQuotes.length + doubleQuotes.length}`
      );
    }
  } catch (err) {
    // Silently fail
  }
});

// Progress bar
const width = 40;
const completeChars = Math.round(((migrated + noStrings) / total) * width);
const progressBar =
  '█'.repeat(completeChars) + '░'.repeat(width - completeChars);
console.log(`\nProgress: [${progressBar}] ${completionRate}%`);
