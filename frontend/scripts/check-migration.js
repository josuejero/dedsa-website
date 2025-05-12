"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const glob_1 = require("glob");
const path = __importStar(require("path"));
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
const STRING_PATTERNS = [/'([^']{5,})'/g, /"([^"]{5,})"/g];
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
const getFiles = () => {
    const files = [];
    DIRS.forEach((dir) => {
        const pattern = path.join(process.cwd(), dir, '**/*.{ts,tsx}');
        files.push(...glob_1.glob.sync(pattern));
    });
    return files;
};
// Check migration status for files
const checkFiles = (files) => {
    const results = {
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
        const usesMigration = CONTENT_HOOKS.some((pattern) => pattern.test(content));
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
            if (hasHardcodedStrings)
                break;
        }
        // Categorize the file
        if (usesMigration) {
            results.migrated.push(relativePath);
        }
        else if (hasHardcodedStrings) {
            results.notMigrated.push(relativePath);
        }
        else {
            results.noStrings.push(relativePath);
        }
    });
    return results;
};
// Main function
const main = () => {
    // Get all files
    const files = getFiles();
    // Check migration status
    const results = checkFiles(files);
    // Print results
    console.log('Content Migration Progress:');
    console.log('--------------------------');
    console.log(`Total files: ${results.total}`);
    console.log(`Files migrated: ${results.migrated.length} (${Math.round((results.migrated.length / results.total) * 100)}%)`);
    console.log(`Files with hardcoded strings: ${results.notMigrated.length} (${Math.round((results.notMigrated.length / results.total) * 100)}%)`);
    console.log(`Files with no strings: ${results.noStrings.length} (${Math.round((results.noStrings.length / results.total) * 100)}%)`);
    // Print next files to migrate
    console.log('\nNext Files to Migrate:');
    results.notMigrated.slice(0, 10).forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });
    // Save detailed results
    const outputPath = path.join(process.cwd(), 'scripts', 'migration-progress.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\nDetailed results saved to: ${outputPath}`);
};
// Run the script
main();
