import { ComponentContent } from '@/types/content';

// Import all component content files
// Replace these with your actual component filenames
const components = require.context('./', false, /\.ts$/);
const componentFiles = components.keys().filter((key) => key !== './index.ts');

const componentContent: ComponentContent = {};

// Dynamically load all component files
componentFiles.forEach((key) => {
  const componentName = key.replace(/\.\/(.*)\.ts$/, '$1');
  componentContent[componentName] = components(key).default;
});

export default componentContent;
