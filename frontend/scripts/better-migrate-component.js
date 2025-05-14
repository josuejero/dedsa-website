const fs = require('fs');
const path = require('path');

// Get component file path from command line
const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a component file path');
  process.exit(1);
}

// Determine if we're in the frontend directory
const isInFrontend = process.cwd().endsWith('frontend');
const frontendBasePath = isInFrontend
  ? process.cwd()
  : path.join(process.cwd(), '..');

// Resolve full path with proper base directory
const fullPath = path.resolve(frontendBasePath, filePath);
if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${fullPath}`);
  process.exit(1);
}

// Read component file
const content = fs.readFileSync(fullPath, 'utf8');
const componentName = path.basename(filePath, path.extname(filePath));

console.log(`Processing ${componentName}...`);

// Better regex patterns that avoid common false positives
const singleQuoteStrings = content.match(/'([^'\n]{5,})'/g) || [];
const doubleQuoteStrings = content.match(/"([^"\n]{5,})"/g) || [];

// Terms that indicate code not UI text
const codeTerms = [
  'import',
  'require',
  'from',
  '@',
  './',
  'className',
  'class=',
  'style=',
  'function',
  'const ',
  'let ',
  'var ',
  ':',
  '=>',
  '{',
  '}',
  'interface',
  'px',
  'vw',
  'vh',
  'rem',
  'em',
  '%',
  '-',
  'bg-',
  'text-',
  'font-',
  'flex',
  'http://',
  'https://',
  '.com',
  'aria-',
];

// Combine and cleanup
const allStrings = [...singleQuoteStrings, ...doubleQuoteStrings]
  .map((str) => str.slice(1, -1))
  .filter((str) => {
    // Skip strings with code indicators
    if (codeTerms.some((term) => str.includes(term))) {
      return false;
    }

    // Include only if it might be UI text - has letters and reasonable length
    return (
      str.length >= 5 &&
      /[A-Za-z]/.test(str) &&
      str.length <= 100 && // Not too long
      !str.startsWith('/*') &&
      !str.startsWith('//')
    );
  });

// Create or append to the strings file
let migratedContent = content;

// Determine relative path to hooks based on file location
const componentDepth = filePath.split('/').length - 1;
const hooksPath = '../'.repeat(componentDepth) + 'hooks/content/useUiString';

// Check if already imported useUiString
const hasImport = content.includes('useUiString');
if (!hasImport && allStrings.length > 0) {
  // Add import at the top
  const importStatement = `import { useUiString } from '${hooksPath}';\n`;

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

// If no strings, update migration progress
if (allStrings.length === 0) {
  try {
    const progressPath = path.join(process.cwd(), 'migration-progress.json');
    if (fs.existsSync(progressPath)) {
      const progress = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
      const relPath = path.relative(frontendBasePath, fullPath);

      const index = progress.notMigrated.indexOf(relPath);
      if (index !== -1) {
        progress.notMigrated.splice(index, 1);
        if (!progress.noStrings.includes(relPath)) {
          progress.noStrings.push(relPath);
        }
        fs.writeFileSync(
          progressPath,
          JSON.stringify(progress, null, 2),
          'utf8'
        );
        console.log(
          `\nAutomatically marked "${relPath}" as having no UI text to migrate`
        );
      }
    }
  } catch (error) {
    console.error('Error updating progress:', error.message);
  }
}

if (allStrings.length > 0) {
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
  console.log(
    '3. When ready, rename the .migrated file to replace the original'
  );
}
