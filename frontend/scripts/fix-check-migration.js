const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Directories to scan
const DIRS = ['src/components', 'src/app'];

// Patterns to detect content hooks/functions
const CONTENT_HOOKS = [
  /useGlobalContent/,
  /useUiString/,
  /useUiStringsByComponent/,
  /getGlobalContent/,
  /getUiString/,
  /getUiStringsByComponent/,
  /getHomeContent/,
];

// Patterns to detect hardcoded strings
const STRING_PATTERNS = [/'([^'\n]{5,})'/g, /"([^"\n]{5,})"/g];

// Exclude patterns
const EXCLUDE_PATTERNS = [
  /import/,
  /require/,
  /className/,
  /function/,
  /const /,
  /let /,
  /var /,
  /error/i,
  /Error/,
  /console\./,
];

// Find all TypeScript/JSX files
function getFiles() {
  const files = [];
  DIRS.forEach((dir) => {
    // Navigate to frontend directory if not already there
    const basePath = path.resolve(process.cwd()).includes('/frontend')
      ? process.cwd()
      : path.join(process.cwd(), '..');

    const pattern = path.join(basePath, dir, '**/*.{ts,tsx}');
    files.push(...glob.sync(pattern));
  });
  return files;
}

// Check migration status for files
function checkFiles(files) {
  const results = {
    total: files.length,
    migrated: [],
    notMigrated: [],
    noStrings: [],
  };

  // Process files in batches to avoid memory issues
  const batchSize = 20;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    batch.forEach((file) => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const relativePath = path.relative(
          path.resolve(process.cwd()).includes('/frontend')
            ? path.join(process.cwd(), '..')
            : process.cwd(),
          file
        );

        // Check if using content hooks
        const usesMigration = CONTENT_HOOKS.some((pattern) =>
          pattern.test(content)
        );

        // Check for hardcoded strings
        let hasHardcodedStrings = false;
        const lines = content.split('\n');
        for (const line of lines) {
          // Skip excluded patterns
          if (EXCLUDE_PATTERNS.some((pattern) => pattern.test(line))) {
            continue;
          }

          // Check string patterns
          for (const pattern of STRING_PATTERNS) {
            pattern.lastIndex = 0;
            if (pattern.test(line)) {
              hasHardcodedStrings = true;
              break;
            }
          }

          if (hasHardcodedStrings) break;
        }

        // Categorize the file
        if (usesMigration) {
          results.migrated.push(relativePath);
        } else if (hasHardcodedStrings) {
          results.notMigrated.push(relativePath);
        } else {
          results.noStrings.push(relativePath);
        }
      } catch (error) {
        console.error(`Error processing file ${file}:`, error.message);
      }
    });
  }

  return results;
}

// Main function
function main() {
  console.log('Scanning files for migration status...');

  // Get all files
  const files = getFiles();
  console.log(`Found ${files.length} files to scan`);

  // Check migration status
  const results = checkFiles(files);

  // Print results
  console.log('\nContent Migration Progress:');
  console.log('--------------------------');
  console.log(`Total files: ${results.total}`);

  const migratedPercent = results.total
    ? Math.round((results.migrated.length / results.total) * 100)
    : 0;
  const notMigratedPercent = results.total
    ? Math.round((results.notMigrated.length / results.total) * 100)
    : 0;
  const noStringsPercent = results.total
    ? Math.round((results.noStrings.length / results.total) * 100)
    : 0;

  console.log(
    `Files migrated: ${results.migrated.length} (${migratedPercent}%)`
  );
  console.log(
    `Files with hardcoded strings: ${results.notMigrated.length} (${notMigratedPercent}%)`
  );
  console.log(
    `Files with no strings: ${results.noStrings.length} (${noStringsPercent}%)`
  );

  // Print next files to migrate
  console.log('\nNext Files to Migrate:');
  results.notMigrated.slice(0, 10).forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });

  // Save detailed results - Fix the path issue!
  const outputPath = path.join(process.cwd(), 'migration-progress.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nDetailed results saved to: ${outputPath}`);
}

// Run the script
main();
