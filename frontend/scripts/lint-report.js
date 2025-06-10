const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// Regex patterns to capture import and require statements
// Updated to handle multiline imports
const importRegex =
  /import\s+(?:type\s+)?(?:[^'"\n\r]+\s+from\s+|[^'"\n\r]*\{[^}]*\}\s*from\s+)?['"](.+?)['"]/gs;
const requireRegex = /require\(['"](.+)['"]\)/g;

(async function main() {
  // Resolve project root
  const rootDir = path.resolve(__dirname, '..');
  console.log(`DEBUG: Root directory: ${rootDir}`);

  /**
   * Resolve module specifiers to absolute filesystem paths.
   * Supports '@/' alias mapping to '<rootDir>/src' and relative imports.
   */
  function resolveImportPath(specifier, fileDir) {
    let resolved;
    if (specifier.startsWith('@/')) {
      // Map '@/...' to '<rootDir>/src/...'
      resolved = path.resolve(rootDir, 'src', specifier.replace(/^@\//, ''));
      console.log(`DEBUG: Resolved '@/' alias: ${specifier} -> ${resolved}`);
    } else if (specifier.startsWith('.')) {
      // Relative path: resolve against containing file
      resolved = path.resolve(fileDir, specifier);
      console.log(`DEBUG: Resolved relative path: ${specifier} -> ${resolved}`);
    } else {
      // External module or unsupported alias: skip
      console.log(`DEBUG: Skipping external module: ${specifier}`);
      return null;
    }
    return resolved;
  }

  /**
   * Helper function to include imported file content
   */
  function includeImportedFiles(filePath, seenImports, report) {
    if (!fs.existsSync(filePath)) {
      report += `\n--- DEBUG: File does not exist: ${filePath} ---\n`;
      console.log(`DEBUG: File does not exist: ${filePath}`);
      return report;
    }

    report += `\n--- DEBUG: Processing imports for: ${filePath} ---\n`;
    console.log(`DEBUG: Processing imports for: ${filePath}`);

    const content = fs.readFileSync(filePath, 'utf8');
    const importPaths = new Set();
    let match;

    // Reset regex lastIndex to avoid issues with global regex
    importRegex.lastIndex = 0;
    requireRegex.lastIndex = 0;

    while ((match = importRegex.exec(content))) importPaths.add(match[1]);
    while ((match = requireRegex.exec(content))) importPaths.add(match[1]);

    report += `\n--- DEBUG: Found ${importPaths.size} import specifiers: ${Array.from(importPaths).join(', ')} ---\n`;
    console.log(
      `DEBUG: Found ${importPaths.size} import specifiers: ${Array.from(importPaths).join(', ')}`
    );

    const fileDir = path.dirname(filePath);

    // Resolve and include each import's file content
    for (const specifier of importPaths) {
      report += `\n--- DEBUG: Processing specifier: ${specifier} ---\n`;
      console.log(`DEBUG: Processing specifier: ${specifier}`);

      const basePath = resolveImportPath(specifier, fileDir);
      if (!basePath) {
        report += `\n--- DEBUG: Skipping external/unsupported specifier: ${specifier} ---\n`;
        console.log(
          `DEBUG: Skipping external/unsupported specifier: ${specifier}`
        );
        continue;
      }

      report += `\n--- DEBUG: Resolved base path: ${basePath} ---\n`;
      console.log(`DEBUG: Resolved base path: ${basePath}`);

      // Try file extensions
      const extensions = ['.js', '.jsx', '.ts', '.tsx', '.json'];
      let absPath = null;
      for (const ext of extensions) {
        const candidate = basePath.endsWith(ext) ? basePath : basePath + ext;
        report += `\n--- DEBUG: Checking candidate: ${candidate} ---\n`;
        console.log(`DEBUG: Checking candidate: ${candidate}`);
        if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
          absPath = candidate;
          report += `\n--- DEBUG: Found file: ${candidate} ---\n`;
          console.log(`DEBUG: Found file: ${candidate}`);
          break;
        }
      }
      // If directory, try index.* files
      if (
        !absPath &&
        fs.existsSync(basePath) &&
        fs.statSync(basePath).isDirectory()
      ) {
        report += `\n--- DEBUG: Checking directory for index files: ${basePath} ---\n`;
        console.log(`DEBUG: Checking directory for index files: ${basePath}`);
        for (const idxName of [
          'index.js',
          'index.jsx',
          'index.ts',
          'index.tsx',
        ]) {
          const idxPath = path.join(basePath, idxName);
          report += `\n--- DEBUG: Checking index file: ${idxPath} ---\n`;
          console.log(`DEBUG: Checking index file: ${idxPath}`);
          if (fs.existsSync(idxPath) && fs.statSync(idxPath).isFile()) {
            absPath = idxPath;
            report += `\n--- DEBUG: Found index file: ${idxPath} ---\n`;
            console.log(`DEBUG: Found index file: ${idxPath}`);
            break;
          }
        }
      }

      if (absPath && !seenImports.has(absPath)) {
        seenImports.add(absPath);
        report += `\n--- DEBUG: Including imported file: ${absPath} ---\n`;
        console.log(`DEBUG: Including imported file: ${absPath}`);
        try {
          const impContent = fs.readFileSync(absPath, 'utf8');
          report += `\n--- Imported File Content: ${absPath} ---\n${impContent}\n`;
        } catch (err) {
          report += `\n--- Could not read imported file: ${absPath} (${err.message}) ---\n`;
          console.log(
            `DEBUG: Could not read imported file: ${absPath} (${err.message})`
          );
        }
      } else if (absPath) {
        report += `\n--- DEBUG: Already seen import: ${absPath} ---\n`;
        console.log(`DEBUG: Already seen import: ${absPath}`);
      } else {
        report += `\n--- DEBUG: Could not resolve import: ${specifier} ---\n`;
        console.log(`DEBUG: Could not resolve import: ${specifier}`);
      }
    }

    return report;
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

      // 4a. Include imported files
      report = includeImportedFiles(res.filePath, seenImports, report);
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

    console.log(
      `DEBUG: Found TypeScript error files: ${Array.from(tsFiles).join(', ')}`
    );

    for (const filePath of tsFiles) {
      const absPath = path.isAbsolute(filePath)
        ? filePath
        : path.resolve(rootDir, filePath);

      console.log(
        `DEBUG: Processing TypeScript error file: ${filePath} -> ${absPath}`
      );

      try {
        const content = fs.readFileSync(absPath, 'utf8');
        report += `\n=== File Content for ${filePath} ===\n${content}\n`;

        // 5c. FIXED: Also include imported files for TypeScript error files
        console.log(
          `DEBUG: About to process imports for TS error file: ${absPath}`
        );
        report = includeImportedFiles(absPath, seenImports, report);
      } catch (err) {
        report += `\n=== Could not read file content for ${filePath}: ${err.message} ===\n`;
        console.log(
          `DEBUG: Could not read file content for ${filePath}: ${err.message}`
        );
      }
    }
  }

  // 6. Run npm run build
  console.log('DEBUG: Running npm run build...');
  const build = spawnSync('npm', ['run', 'build'], {
    cwd: rootDir,
    encoding: 'utf-8',
  });
  if (build.status !== 0) {
    const buildOutput = build.stdout || build.stderr;
    report += `\n=== Build Errors ===\n${buildOutput}\n`;

    // 6b. Extract build error file paths and append contents
    const buildErrorLines = buildOutput.split(/\r?\n/);
    const buildFiles = new Set();

    for (const line of buildErrorLines) {
      // Match Next.js build error patterns
      const patterns = [
        /^(.+\.(?:ts|tsx|js|jsx))\(\d+,\d+\):/, // TypeScript style errors
        /Error occurred prerendering page "(.+)"/, // Next.js prerender errors
        /Failed to compile\.[\s\S]*?\.\/(.+\.(?:ts|tsx|js|jsx))/, // Webpack compilation errors
        /Module not found: Can't resolve '(.+)' in '(.+)'/, // Module resolution errors
      ];

      for (const pattern of patterns) {
        const m = line.match(pattern);
        if (m) {
          // For module resolution errors, use the second capture group (the directory)
          const filePath = m[2] || m[1];
          if (filePath && filePath.includes('.')) {
            buildFiles.add(filePath);
          }
        }
      }
    }

    console.log(
      `DEBUG: Found build error files: ${Array.from(buildFiles).join(', ')}`
    );

    for (const filePath of buildFiles) {
      const absPath = path.isAbsolute(filePath)
        ? filePath
        : path.resolve(rootDir, filePath);

      console.log(
        `DEBUG: Processing build error file: ${filePath} -> ${absPath}`
      );

      try {
        if (fs.existsSync(absPath)) {
          const content = fs.readFileSync(absPath, 'utf8');
          report += `\n=== File Content for Build Error ${filePath} ===\n${content}\n`;

          // 6c. Include imported files for build error files
          console.log(
            `DEBUG: About to process imports for build error file: ${absPath}`
          );
          report = includeImportedFiles(absPath, seenImports, report);
        }
      } catch (err) {
        report += `\n=== Could not read file content for ${filePath}: ${err.message} ===\n`;
        console.log(
          `DEBUG: Could not read file content for ${filePath}: ${err.message}`
        );
      }
    }
  } else {
    console.log('DEBUG: Build completed successfully');
  }

  // 7. Output report
  if (report) {
    fs.writeFileSync('lint-report.txt', report);
    console.log(
      'Lint, type, or build issues found. Details written to lint-report.txt'
    );
  } else {
    console.log('No lint, type, or build issues detected.');
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
