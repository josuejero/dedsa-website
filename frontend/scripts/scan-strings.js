const fs = require('fs');
const path = require('path');

// Directories to scan
const DIRS = ['src/components', 'src/app'];

// Function to find all TypeScript/React files recursively
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to extract strings from a file
function extractStrings(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  const singleQuoteStrings = content.match(/'([^']{5,})'/g) || [];
  const doubleQuoteStrings = content.match(/"([^"]{5,})"/g) || [];

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

  return allStrings;
}

// Main function
function main() {
  let allFiles = [];

  // Gather all files
  DIRS.forEach((dir) => {
    allFiles = allFiles.concat(findFiles(dir));
  });

  console.log(`Found ${allFiles.length} files to scan\n`);

  // Process files
  const results = [];

  allFiles.forEach((file) => {
    const strings = extractStrings(file);

    if (strings.length > 0) {
      results.push({
        file,
        count: strings.length,
        strings: strings.slice(0, 3), // Just show first 3 for brevity
      });
    }
  });

  // Sort by string count
  results.sort((a, b) => b.count - a.count);

  // Display results
  console.log('Files with hardcoded strings (sorted by count):\n');

  results.forEach((result, i) => {
    console.log(`${i + 1}. ${result.file} (${result.count} strings)`);
    if (result.strings.length > 0) {
      console.log('   Examples:');
      result.strings.forEach((str) => {
        console.log(
          `   - "${str.length > 50 ? str.substring(0, 47) + '...' : str}"`
        );
      });
    }
    console.log('');
  });

  console.log(`Total files with strings: ${results.length}`);
  console.log(`Total strings: ${results.reduce((sum, r) => sum + r.count, 0)}`);
}

main();
