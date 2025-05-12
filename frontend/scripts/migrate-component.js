const fs = require('fs');
const path = require('path');

// Get component file path from command line
const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a component file path');
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), filePath);
if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${fullPath}`);
  process.exit(1);
}

// Read component file
const content = fs.readFileSync(fullPath, 'utf8');
const componentName = path.basename(filePath, path.extname(filePath));

// Extract hardcoded strings
const singleQuoteStrings = content.match(/'([^']{5,})'/g) || [];
const doubleQuoteStrings = content.match(/"([^"]{5,})"/g) || [];

// Combine and cleanup
const allStrings = [...singleQuoteStrings, ...doubleQuoteStrings]
  .map((str) => str.slice(1, -1))
  .filter((str) => {
    return (
      !str.includes('import') &&
      !str.includes('require') &&
      !str.includes('className') &&
      !str.includes('function')
    );
  });

// Create or append to the strings file
let migratedContent = content;

// Check if already imported useUiString
const hasImport = content.includes('useUiString');
if (!hasImport && allStrings.length > 0) {
  // Add import at the top
  const importStatement =
    "import { useUiString } from '../../hooks/content/useUiString';\n";

  // Find a good place to add the import (after other imports)
  const importPattern = /import.*from.*;/g;
  const lastImportMatch = [...content.matchAll(importPattern)].pop();

  if (lastImportMatch) {
    const insertPos = lastImportMatch.index + lastImportMatch[0].length;
    migratedContent =
      content.slice(0, insertPos) +
      '\n' +
      importStatement +
      content.slice(insertPos);
  } else {
    migratedContent = importStatement + content;
  }
}

// Write the migrated content to a .migrated file
const migratedPath = fullPath + '.migrated';
fs.writeFileSync(migratedPath, migratedContent, 'utf8');

// Output a report
console.log(`\nComponent: ${componentName}`);
console.log(`Found ${allStrings.length} hardcoded strings`);
console.log(`Created file: ${migratedPath}`);
console.log('\nStrings to migrate:');

allStrings.forEach((str, i) => {
  const key = `${componentName.toLowerCase()}_${str
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 30)}`;
  console.log(`${i + 1}. Original: "${str}"`);
  console.log(
    `   Replace with: useUiString('${key}', '${str.replace(/'/g, "\\'")}')`
  );
});

console.log('\nNext steps:');
console.log(
  '1. Edit the .migrated file to replace hardcoded strings with useUiString calls'
);
console.log('2. Test the component locally');
console.log('3. When ready, rename the .migrated file to replace the original');
