const fs = require('fs');
const path = require('path');

// Get command line argument for file path
const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a file path');
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), filePath);
if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${fullPath}`);
  process.exit(1);
}

// Read the file content
const content = fs.readFileSync(fullPath, 'utf8');

// Extract strings with at least 3 characters
const singleQuoteStrings = content.match(/'([^']{3,})'/g) || [];
const doubleQuoteStrings = content.match(/"([^"]{3,})"/g) || [];

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
  '<',
  '>',
  '/',
  'path',
  'd=',
  'M',
  'C',
  'role=',
  'target=',
  'rel=',
];

// Combine and clean up strings to only include likely UI text
const allStrings = [...singleQuoteStrings, ...doubleQuoteStrings]
  .map((str) => str.slice(1, -1)) // Remove quotes
  .filter((str) => {
    // Skip strings with code indicators
    if (codeTerms.some((term) => str.includes(term))) {
      return false;
    }

    // Include only if it might be UI text - has letters and reasonable length
    return (
      str.length >= 3 &&
      /[A-Za-z]/.test(str) &&
      str.length <= 100 && // Not too long
      !str.startsWith('/*') &&
      !str.startsWith('//')
    );
  });

// Generate component ID from file path
const componentName = path.basename(filePath, path.extname(filePath));

// Output results
console.log(
  `\nExtracted ${allStrings.length} potential UI strings from ${componentName}:\n`
);
allStrings.forEach((str, i) => {
  const key = `${componentName.toLowerCase()}_${str
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 30)}`;
  console.log(`${i + 1}. "${str}"\n   Key: ${key}\n`);
});
