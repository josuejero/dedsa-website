const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all component files
const files = glob.sync('src/**/*.{jsx,tsx,js,ts}');

let totalMatches = 0;
let modifiedFiles = 0;

files.forEach(file => {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file contains dark: classes
  if (content.includes('dark:')) {
    const originalContent = content;
    
    // Regular expression to match dark mode classes
    // This pattern matches class attributes containing dark: prefixed classes
    const classPattern = /(?:className|class)=(?:["'`])([^"'`]*)(?:["'`])/g;
    
    content = content.replace(classPattern, (match, classString) => {
      // Remove dark: classes from the class string
      const newClassString = classString.replace(/\bdark:[^ ]*/g, '').trim().replace(/\s+/g, ' ');
      return match.replace(classString, newClassString);
    });
    
    // If content changed, save the file
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedFiles++;
      
      // Count the number of dark: instances removed
      const matches = (originalContent.match(/dark:/g) || []).length;
      totalMatches += matches;
      
      console.log(`Modified: ${file} (removed ${matches} dark mode classes)`);
    }
  }
});

console.log(`
Removal complete:
- Removed ${totalMatches} dark mode classes
- Modified ${modifiedFiles} files
`);
