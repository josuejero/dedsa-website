#!/usr/bin/env node
// minify-json.js

const fs = require('fs/promises');
const path = require('path');

// Directories to ignore during traversal
const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'original-backup',
  'backend',
  '.husky',
  'fonts',
]);

async function* getJsonFiles(dir) {
  for (const dirent of await fs.readdir(dir, { withFileTypes: true })) {
    const res = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      if (IGNORED_DIRS.has(dirent.name)) continue;
      yield* getJsonFiles(res);
    } else if (dirent.isFile() && path.extname(dirent.name) === '.json') {
      yield res;
    }
  }
}

(async () => {
  const rootDir = process.argv[2] || process.cwd();
  const files = [];
  for await (const filePath of getJsonFiles(rootDir)) {
    const text = await fs.readFile(filePath, 'utf8');
    try {
      const data = JSON.parse(text);
      const minified = JSON.stringify(data);
      if (minified !== text.trim()) {
        await fs.writeFile(filePath, minified + '\n', 'utf8');
        files.push(path.relative(rootDir, filePath));
      }
    } catch {
      console.error(`⚠️  Skipping invalid JSON: ${filePath}`);
    }
  }
  for (const f of files) {
    console.log(`Minified ${f}`);
  }
})();
