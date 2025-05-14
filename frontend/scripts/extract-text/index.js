const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

// Directories to scan for TSX files
const DIRS_TO_SCAN = [
  path.join(__dirname, '../../frontend/src/components'),
  path.join(__dirname, '../../frontend/src/app'),
];

// Output directory for content files
const CONTENT_DIR = path.join(__dirname, '../../frontend/src/content');

// Function to extract text from a component file
async function extractTextFromComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath, path.extname(filePath));
  const componentName = fileName.charAt(0).toLowerCase() + fileName.slice(1);

  // Skip if already processed
  const contentFilePath = path.join(
    CONTENT_DIR,
    'components',
    `${componentName}.ts`
  );
  if (fs.existsSync(contentFilePath)) {
    console.log(
      `Content file already exists for ${componentName}, skipping...`
    );
    return;
  }

  console.log(`Processing ${filePath}`);

  const extractedText = {};
  let hasExtractableText = false;

  try {
    // Parse the file
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });

    // Traverse the AST to find text nodes
    traverse(ast, {
      JSXText(path) {
        const text = path.node.value.trim();
        if (text && text.length > 1) {
          const key = `text_${Object.keys(extractedText).length}`;
          extractedText[key] = text;
          hasExtractableText = true;
        }
      },
      StringLiteral(path) {
        // Skip import paths, variable names, etc.
        if (
          path.parent.type === 'ImportDeclaration' ||
          path.parent.type === 'VariableDeclarator' ||
          path.parent.type === 'MemberExpression' ||
          (path.parent.type === 'JSXAttribute' &&
            path.parent.name.name === 'className')
        ) {
          return;
        }

        const text = path.node.value.trim();
        if (text && text.length > 1) {
          const key = `text_${Object.keys(extractedText).length}`;
          extractedText[key] = text;
          hasExtractableText = true;
        }
      },
    });

    if (hasExtractableText) {
      // Create the content file
      const contentFileContent = `const ${componentName} = ${JSON.stringify(extractedText, null, 2)};\n\nexport default ${componentName};\n`;

      // Ensure the directory exists
      const dir = path.dirname(contentFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write the file
      fs.writeFileSync(contentFilePath, contentFileContent);
      console.log(`Created content file: ${contentFilePath}`);
    } else {
      console.log(`No extractable text found in ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Function to scan directories for TSX files
async function scanDirectories() {
  const tsxFiles = [];

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (
        entry.isFile() &&
        (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx'))
      ) {
        tsxFiles.push(fullPath);
      }
    }
  }

  for (const dir of DIRS_TO_SCAN) {
    scanDir(dir);
  }

  console.log(`Found ${tsxFiles.length} TSX/JSX files to process`);

  // Process each file
  for (const file of tsxFiles) {
    await extractTextFromComponent(file);
  }
}

// Run the script
scanDirectories().then(() => {
  console.log('Text extraction complete!');
});
