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

// Extract strings with at least 5 characters
const singleQuoteStrings = content.match(/'([^']{5,})'/g) || [];
const doubleQuoteStrings = content.match(/"([^"]{5,})"/g) || [];

// Combine and clean up strings
const allStrings = [...singleQuoteStrings, ...doubleQuoteStrings]
  .map((str) => str.slice(1, -1)) // Remove quotes
  .filter((str) => {
    // Skip if the string contains any of these code-related patterns
    const codePatterns = [
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
      '{',
      '}',
      ':',
      '=>',
      '=>',
      'interface',
      'type',
      'export',
      'px',
      'vw',
      'vh',
      'rem',
      'em',
      '-',
      'inset',
      'bg-',
      'noopener',
      'noreferrer',
      'aria-',
      'data-',
      'href=',
    ];

    if (codePatterns.some((pattern) => str.includes(pattern))) {
      return false;
    }

    // Only include strings that look like sentences or phrases
    // Must have at least 10 characters and include spaces
    return str.length >= 10 && str.includes(' ') && /[A-Za-z]/.test(str);
  });

// Generate component ID from file path
const componentId = path.basename(filePath, path.extname(filePath));

// Output results
console.log(`\nExtracted ${allStrings.length} strings from ${componentId}:\n`);
allStrings.forEach((str, i) => {
  const key = `${componentId.toLowerCase()}_${str
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 30)}`;
  console.log(`${i + 1}. "${str}"\n   Key: ${key}\n`);
});
