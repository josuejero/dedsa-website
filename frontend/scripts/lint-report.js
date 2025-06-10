const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// Regex patterns to capture import and require statements
const importRegex = /import\s+(?:[^'"\n]+\s+from\s+)?['"](.+)['"]/g;
const requireRegex = /require\(['"](.+)['"]\)/g;

(async function main() {
  // Resolve project root
  const rootDir = path.resolve(__dirname, '..');

  /**
   * Resolve module specifiers to absolute filesystem paths.
   * Supports '@/' alias mapping to '<rootDir>/src' and relative imports.
   */
  function resolveImportPath(specifier, fileDir) {
    let resolved;
    if (specifier.startsWith('@/')) {
      // Map '@/...' to '<rootDir>/src/...'
      resolved = path.resolve(rootDir, 'src', specifier.replace(/^@\//, ''));
    } else if (specifier.startsWith('.')) {
      // Relative path: resolve against containing file
      resolved = path.resolve(fileDir, specifier);
    } else {
      // External module or unsupported alias: skip
      return null;
    }
    return resolved;
  }

  // 1. Initialize ESLint (auto-detect config)
  const eslint = new ESLint({
    cwd: rootDir,
    ignore: false,
    errorOnUnmatchedPattern: false,
  });

  // 2. Lint all project files
  const results = await eslint.lintFiles(['src/**/*.{js,jsx,ts,tsx}']);
  let report = '';
  const seenImports = new Set();

  for (const res of results) {
    if (res.errorCount || res.warningCount) {
      // 3. Append file path and messages
      report += `\n=== ESLint: ${res.filePath} ===\n`;
      for (const msg of res.messages) {
        report += `Line ${msg.line}, Col ${msg.column}: ${msg.message} (${msg.ruleId})\n`;
      }

      // 4. Append full file content
      const content = fs.readFileSync(res.filePath, 'utf8');
      report += `\n--- File Content: ${res.filePath} ---\n${content}\n`;

      // 4a. Collect imported module specifiers
      const importPaths = new Set();
      let match;
      while ((match = importRegex.exec(content))) importPaths.add(match[1]);
      while ((match = requireRegex.exec(content))) importPaths.add(match[1]);

      const fileDir = path.dirname(res.filePath);
      // 4b. Resolve and include each import's file content
      for (const specifier of importPaths) {
        const basePath = resolveImportPath(specifier, fileDir);
        if (!basePath) continue;

        // Try file extensions
        const extensions = ['.js', '.jsx', '.ts', '.tsx', '.json'];
        let absPath = null;
        for (const ext of extensions) {
          const candidate = basePath.endsWith(ext) ? basePath : basePath + ext;
          if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
            absPath = candidate;
            break;
          }
        }
        // If directory, try index.* files
        if (
          !absPath &&
          fs.existsSync(basePath) &&
          fs.statSync(basePath).isDirectory()
        ) {
          for (const idxName of [
            'index.js',
            'index.jsx',
            'index.ts',
            'index.tsx',
          ]) {
            const idxPath = path.join(basePath, idxName);
            if (fs.existsSync(idxPath) && fs.statSync(idxPath).isFile()) {
              absPath = idxPath;
              break;
            }
          }
        }

        if (absPath && !seenImports.has(absPath)) {
          seenImports.add(absPath);
          try {
            const impContent = fs.readFileSync(absPath, 'utf8');
            report += `\n--- Imported File Content: ${absPath} ---\n${impContent}\n`;
          } catch (err) {
            report += `\n--- Could not read imported file: ${absPath} (${err.message}) ---\n`;
          }
        }
      }
    }
  }

  // 5. Run TypeScript compiler (noEmit)
  const tsc = spawnSync('npx', ['tsc', '--noEmit'], {
    cwd: rootDir,
    encoding: 'utf-8',
  });
  if (tsc.status !== 0) {
    const tscOutput = tsc.stdout || tsc.stderr;
    report += `\n=== TypeScript Compiler Errors ===\n${tscOutput}\n`;

    // 5b. Extract TS error file paths and append contents
    const errorLines = tscOutput.split(/\r?\n/);
    const tsFiles = new Set();
    for (const line of errorLines) {
      const m = line.match(/^(.+\.(?:ts|tsx))\(\d+,\d+\):/);
      if (m) tsFiles.add(m[1]);
    }
    for (const filePath of tsFiles) {
      const absPath = path.isAbsolute(filePath)
        ? filePath
        : path.resolve(rootDir, filePath);
      try {
        const content = fs.readFileSync(absPath, 'utf8');
        report += `\n=== File Content for ${filePath} ===\n${content}\n`;
      } catch (err) {
        report += `\n=== Could not read file content for ${filePath}: ${err.message} ===\n`;
      }
    }
  }

  // 6. Output report
  if (report) {
    fs.writeFileSync('lint-report.txt', report);
    console.log(
      'Lint or type issues found. Details written to lint-report.txt'
    );
  } else {
    console.log('No lint or type issues detected.');
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
