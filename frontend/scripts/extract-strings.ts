// extract-strings.ts
import { execSync } from 'child_process';
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

//
// Configuration
//

const DIRS: string[] = ['src/components', 'src/app'];

const STRING_PATTERNS: RegExp[] = [
  /'([^']{5,})'/g, // Single quotes, at least 5 chars
  /"([^"]{5,})"/g, // Double quotes, at least 5 chars
];

const EXCLUDE_PATTERNS: RegExp[] = [
  /import/,
  /require/,
  /className/,
  /function/,
  /const\s/,
  /let\s/,
  /var\s/,
  /error/i,
  /Error/,
  /console\./,
];

//
// Types
//

interface ExtractedString {
  key: string;
  value: string;
  line: number;
  componentId: string;
}

interface FileStringsGroup {
  file: string;
  componentId: string;
  strings: ExtractedString[];
}

//
// Helpers
//

/** Find all .ts/.tsx files under the configured directories */
function getComponentFiles(): string[] {
  const files: string[] = [];

  for (const dir of DIRS) {
    const pattern = path.join(__dirname, '..', dir, '**/*.{ts,tsx}');
    files.push(...glob.sync(pattern));
  }

  return files;
}

/** Generate a snake_cased key for a string value */
function generateStringKey(value: string, componentId: string): string {
  const componentName = componentId.split('-').pop()!.toLowerCase();

  const baseKey = value
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 30);

  return `${componentName}_${baseKey}`;
}

/** Extract hardcoded strings from a single file */
function extractStringsFromFile(filePath: string): ExtractedString[] {
  const content = fs.readFileSync(filePath, 'utf8');
  const extracted: ExtractedString[] = [];

  // Compute component ID from file path
  const relPath = path
    .relative(path.join(__dirname, '..'), filePath)
    .replace(/\.[^/.]+$/, '')
    .replace(/[\\/]/g, '-');

  const lines = content.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (EXCLUDE_PATTERNS.some((rx) => rx.test(line))) continue;

    for (const rx of STRING_PATTERNS) {
      rx.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = rx.exec(line)) !== null) {
        const value = match[1];
        if (value.length < 5 || /^[a-z][A-Za-z]+$/.test(value)) continue;

        const key = generateStringKey(value, relPath);

        extracted.push({
          key,
          value,
          line: i + 1,
          componentId: relPath,
        });
      }
    }
  }

  return extracted;
}

/** Main: extract from all files and write JSON + CSV */
function extractAllStrings(): void {
  const files = getComponentFiles();
  const allGroups: FileStringsGroup[] = [];

  for (const file of files) {
    const strings = extractStringsFromFile(file);
    if (strings.length === 0) continue;

    const relativeFile = path.relative(path.join(__dirname, '..'), file);
    allGroups.push({
      file: relativeFile,
      componentId: strings[0].componentId,
      strings,
    });
  }

  // Write JSON output
  const jsonOut = path.join(__dirname, 'extracted-strings.json');
  fs.writeFileSync(jsonOut, JSON.stringify(allGroups, null, 2), 'utf8');

  // Write CSV output
  const csvOut = path.join(__dirname, 'strings-import.csv');
  const rows: string[] = ['string_key,string_value,component_id'];
  for (const group of allGroups) {
    for (const str of group.strings) {
      const escaped = str.value.replace(/"/g, '""');
      rows.push(`${str.key},"${escaped}",${str.componentId}`);
    }
  }
  fs.writeFileSync(csvOut, rows.join('\n'), 'utf8');

  const totalStrings = allGroups.reduce((sum, g) => sum + g.strings.length, 0);
  console.log(
    `Extracted ${totalStrings} strings from ${allGroups.length} files.`
  );
  console.log(`JSON → ${jsonOut}`);
  console.log(`CSV  → ${csvOut}`);
}

//
// Ensure glob is installed, then run
//

try {
  require.resolve('glob');
} catch {
  console.log('Installing glob…');
  execSync('npm install --save-dev glob', { stdio: 'inherit' });
  console.log('Done.');
}

extractAllStrings();
