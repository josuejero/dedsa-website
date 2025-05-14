import * as fs from 'fs';
import { glob } from 'glob';
import * as path from 'path';

// Directories to scan
const DIRS: string[] = ['src/components', 'src/app'];

// Patterns to detect content hooks/functions
const CONTENT_HOOKS: RegExp[] = [
  /useGlobalContent/,
  /useUiString/,
  /useUiStringsByComponent/,
  /getGlobalContent/,
  /getUiString/,
  /getUiStringsByComponent/,
  /getHomeContent/,
];

// Patterns to detect hardcoded strings
const STRING_PATTERNS: RegExp[] = [/'([^']{5,})'/g, /"([^"]{5,})"/g];

// Exclude patterns
const EXCLUDE_PATTERNS: RegExp[] = [
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

interface FileStatus {
  total: number;
  migrated: string[];
  notMigrated: string[];
  noStrings: string[];
}

// Find all TypeScript/JSX files
const getFiles = (): string[] => {
  const files: string[] = [];
  DIRS.forEach((dir) => {
    const pattern = path.join(process.cwd(), dir, '**/*.{ts,tsx}');
    files.push(...glob.sync(pattern));
  });
  return files;
};

// Check migration status for files
const checkFiles = (files: string[]): FileStatus => {
  const results: FileStatus = {
    total: files.length,
    migrated: [],
    notMigrated: [],
    noStrings: [],
  };

  // Check each file
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(process.cwd(), file);

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
  });

  return results;
};

// Main function
const main = (): void => {
  // Get all files
  const files = getFiles();

  // Check migration status
  const results = checkFiles(files);

  // Print results
  console.log('Content Migration Progress:');
  console.log('--------------------------');
  console.log(`Total files: ${results.total}`);
  console.log(
    `Files migrated: ${results.migrated.length} (${Math.round((results.migrated.length / results.total) * 100)}%)`
  );
  console.log(
    `Files with hardcoded strings: ${results.notMigrated.length} (${Math.round((results.notMigrated.length / results.total) * 100)}%)`
  );
  console.log(
    `Files with no strings: ${results.noStrings.length} (${Math.round((results.noStrings.length / results.total) * 100)}%)`
  );

  // Print next files to migrate
  console.log('\nNext Files to Migrate:');
  results.notMigrated.slice(0, 10).forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });

  // Save detailed results
  const outputPath = path.join(
    process.cwd(),
    'scripts',
    'migration-progress.json'
  );
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nDetailed results saved to: ${outputPath}`);
};

// Run the script
main();
