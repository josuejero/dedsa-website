const fs = require('fs');
const path = require('path');

// Base of your frontend folder
const projectRoot = path.resolve(__dirname, '..');
// Now content directories relative to projectRoot
const contentDirs = [
  path.join(projectRoot, 'content/home'),
  path.join(projectRoot, 'content/about'),
  path.join(projectRoot, 'content/join'),
  // …
];

// Output directory
const outputDir = path.join(projectRoot, 'content/consolidated');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

contentDirs.forEach((dir) => {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  const consolidated = {};

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const baseName = path.basename(file, '.json');
    consolidated[baseName] = content;
  });

  const dirName = path.basename(dir);
  fs.writeFileSync(
    path.join(outputDir, `${dirName}.json`),
    JSON.stringify(consolidated, null, 2)
  );

  console.log(
    `Consolidated ${files.length} files from ${dir} into ${outputDir}/${dirName}.json`
  );
});
