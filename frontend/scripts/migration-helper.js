const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if glob is installed
try {
  require.resolve('glob');
} catch (e) {
  console.log('Installing glob dependency...');
  execSync('npm install --save-dev glob', { stdio: 'inherit' });
}

const glob = require('glob');

// Helper functions
const DIRS = ['src/components', 'src/app'];
const STRING_PATTERNS = [/'([^'\n]{5,})'/g, /"([^"\n]{5,})"/g];
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

// Function to scan files
function scanFiles() {
  const files = [];
  DIRS.forEach((dir) => {
    const frontendDir = path.join(process.cwd(), '..').endsWith('frontend')
      ? path.join(process.cwd(), '..')
      : path.join(process.cwd());

    const pattern = path.join(frontendDir, dir, '**/*.{ts,tsx}');
    files.push(...glob.sync(pattern));
  });

  // Process files
  const results = {
    total: files.length,
    migrated: [],
    notMigrated: [],
    noStrings: [],
    stringCounts: {},
  };

  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(
        path.join(process.cwd(), '..').endsWith('frontend')
          ? path.join(process.cwd(), '..')
          : process.cwd(),
        file
      );

      // Check if using content hooks
      const usesMigration =
        content.includes('useUiString') || content.includes('useGlobalContent');

      // Count potential strings
      let stringCount = 0;
      const lines = content.split('\n');
      for (const line of lines) {
        if (EXCLUDE_PATTERNS.some((pat) => pat.test(line))) continue;

        STRING_PATTERNS.forEach((pattern) => {
          pattern.lastIndex = 0;
          const matches = line.match(pattern) || [];
          stringCount += matches.length;
        });
      }

      results.stringCounts[relativePath] = stringCount;

      // Categorize
      if (usesMigration) {
        results.migrated.push(relativePath);
      } else if (stringCount > 0) {
        results.notMigrated.push(relativePath);
      } else {
        results.noStrings.push(relativePath);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  });

  // Save results
  const outputPath = path.join(process.cwd(), 'migration-progress.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  return results;
}

// Function to migrate a component
function migrateComponent(filePath) {
  const frontendDir = path.join(process.cwd(), '..').endsWith('frontend')
    ? path.join(process.cwd(), '..')
    : path.join(process.cwd());

  const fullPath = path.resolve(frontendDir, filePath);

  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const componentName = path.basename(filePath, path.extname(filePath));

  // Extract strings (improved regex to reduce false positives)
  const singleQuoteStrings = content.match(/'([^'\n]{5,})'/g) || [];
  const doubleQuoteStrings = content.match(/"([^"\n]{5,})"/g) || [];

  // Filter out code strings
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

  const allStrings = [...singleQuoteStrings, ...doubleQuoteStrings]
    .map((str) => str.slice(1, -1))
    .filter((str) => {
      if (codeTerms.some((term) => str.includes(term))) return false;
      return (
        str.length >= 5 &&
        /[A-Za-z]/.test(str) &&
        str.length <= 100 &&
        !str.startsWith('/*') &&
        !str.startsWith('//')
      );
    });

  // Create migrated file
  let migratedContent = content;

  // Add import if needed
  const hasImport = content.includes('useUiString');
  if (!hasImport && allStrings.length > 0) {
    const componentDepth = filePath.split('/').length - 1;
    const hooksPath =
      '../'.repeat(componentDepth) + 'hooks/content/useUiString';
    const importStatement = `import { useUiString } from '${hooksPath}';\n`;

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

  // Write migrated file
  const migratedPath = fullPath + '.migrated';
  fs.writeFileSync(migratedPath, migratedContent, 'utf8');

  console.log(`\nComponent: ${componentName}`);
  console.log(`Found ${allStrings.length} potential UI strings`);
  console.log(`Created file: ${migratedPath}`);

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
  } else {
    // Mark as no strings
    try {
      const progressPath = path.join(process.cwd(), 'migration-progress.json');
      if (fs.existsSync(progressPath)) {
        const progress = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
        const relPath = path.relative(frontendDir, fullPath);

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
}

// Show menu and handle user input
function showMenu() {
  console.log('\n===== UI String Migration Helper =====');
  console.log('1. Scan project and show migration status');
  console.log('2. Migrate a component');
  console.log('3. Mark a component as having no strings');
  console.log('4. Show next components to migrate');
  console.log('0. Exit');

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question('\nEnter your choice (0-4): ', (choice) => {
    readline.close();

    switch (choice) {
      case '1':
        const results = scanFiles();
        console.log('\n==== Migration Status ====');
        console.log(`Total files: ${results.total}`);
        console.log(
          `Files migrated: ${results.migrated.length} (${((results.migrated.length / results.total) * 100).toFixed(2)}%)`
        );
        console.log(
          `Files with strings: ${results.notMigrated.length} (${((results.notMigrated.length / results.total) * 100).toFixed(2)}%)`
        );
        console.log(
          `Files with no strings: ${results.noStrings.length} (${((results.noStrings.length / results.total) * 100).toFixed(2)}%)`
        );

        const width = 40;
        const completeChars = Math.round(
          ((results.migrated.length + results.noStrings.length) /
            results.total) *
            width
        );
        const progressBar =
          '█'.repeat(completeChars) + '░'.repeat(width - completeChars);
        const completionRate = (
          ((results.migrated.length + results.noStrings.length) /
            results.total) *
          100
        ).toFixed(2);
        console.log(`\nProgress: [${progressBar}] ${completionRate}%`);

        console.log('\nNext 5 files to migrate:');
        results.notMigrated
          .sort((a, b) => results.stringCounts[b] - results.stringCounts[a])
          .slice(0, 5)
          .forEach((file, i) => {
            console.log(
              `${i + 1}. ${file} (${results.stringCounts[file]} strings)`
            );
          });

        setTimeout(showMenu, 500);
        break;

      case '2':
        const rl2 = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        rl2.question(
          '\nEnter component path (e.g., src/components/Header.tsx): ',
          (path) => {
            rl2.close();
            migrateComponent(path);
            setTimeout(showMenu, 500);
          }
        );
        break;

      case '3':
        const rl3 = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        rl3.question(
          '\nEnter component path to mark as having no strings: ',
          (path) => {
            rl3.close();

            try {
              const progressPath = path.join(
                process.cwd(),
                'migration-progress.json'
              );
              if (fs.existsSync(progressPath)) {
                const progress = JSON.parse(
                  fs.readFileSync(progressPath, 'utf8')
                );

                const index = progress.notMigrated.indexOf(path);
                if (index !== -1) {
                  progress.notMigrated.splice(index, 1);
                  if (!progress.noStrings.includes(path)) {
                    progress.noStrings.push(path);
                  }
                  fs.writeFileSync(
                    progressPath,
                    JSON.stringify(progress, null, 2),
                    'utf8'
                  );
                  console.log(
                    `\nMarked "${path}" as having no UI text to migrate`
                  );
                } else {
                  console.log(`\nFile "${path}" not found in notMigrated list`);
                }
              }
            } catch (error) {
              console.error('Error updating progress:', error.message);
            }

            setTimeout(showMenu, 500);
          }
        );
        break;

      case '4':
        try {
          const progressPath = path.join(
            process.cwd(),
            'migration-progress.json'
          );
          if (fs.existsSync(progressPath)) {
            const progress = JSON.parse(fs.readFileSync(progressPath, 'utf8'));

            console.log('\nNext 10 files to migrate:');
            progress.notMigrated.slice(0, 10).forEach((file, i) => {
              console.log(`${i + 1}. ${file}`);
            });
          }
        } catch (error) {
          console.error('Error reading progress:', error.message);
        }

        setTimeout(showMenu, 500);
        break;

      case '0':
        console.log('Exiting...');
        process.exit(0);
        break;

      default:
        console.log('Invalid choice');
        setTimeout(showMenu, 500);
    }
  });
}

// Start the program
showMenu();
