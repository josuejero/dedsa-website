const fs = require('fs');
const path = require('path');

// Get the migrated status from migration-progress.json
const migrationData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'migration-progress.json'), 'utf8')
);

// Extract all strings from migrated files
const strings = {};

// Function to extract useUiString calls
function extractUiStrings(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const uiStringRegex = /useUiString\('([^']+)',\s*['"]([^'"]+)['"]\)/g;

  let match;
  while ((match = uiStringRegex.exec(content)) !== null) {
    const [, key, defaultValue] = match;
    strings[key] = defaultValue;
  }
}

// Process all migrated files
migrationData.migrated.forEach((file) => {
  extractUiStrings(path.resolve(__dirname, '..', file));
});

// Write to CSV
const csvContent =
  'key,value\n' +
  Object.entries(strings)
    .map(([key, value]) => `"${key}","${value.replace(/"/g, '""')}"`)
    .join('\n');

fs.writeFileSync(path.resolve(__dirname, 'ui-strings.csv'), csvContent, 'utf8');
console.log(
  `Exported ${Object.keys(strings).length} strings to ui-strings.csv`
);
